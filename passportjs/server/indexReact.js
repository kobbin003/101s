import express from "express";
import passport from "passport";
import path from "path";
import createError from "http-errors";
import { initializePassport } from "./passport-config.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import bcrypt from "bcrypt";
import flash from "express-flash";
import session from "express-session";
import cors from "cors";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const app = express();

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
	require("dotenv/config");
}

/** initilaizing passport */
initializePassport(
	passport,
	(email) => {
		const user = app.locals.user;
		// console.log("user", user);
		if (user.email == email) {
			return user;
		}
	},
	(id) => {
		const user = app.locals.user;
		if (user.id == id) {
			return user;
		}
	}
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		// cookie: { secure: true },
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.post("/register", async (req, res) => {
	const contentType = req.headers["content-type"];
	try {
		const { name, email, password } = req.body;
		const saltRounds = 10;
		const hashedPass = await bcrypt.hash(password, saltRounds);
		app.locals.user = { name, email, password: hashedPass, id: 1 };
		res.status(200).json(app.locals.user);
	} catch (error) {
		res.status(500).json({ success: false, error: "Registration failed" });
	}
});

/** errorHandler middleware will handle the error */
// app.post(
// 	"/login",
// 	passport.authenticate("local", {
// 		failWithError: true,
// 	}),
// 	(res, req) => {
// 		res.json({ success: true, message: "Authentication succeeded" });
// 	}
// );

app.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		console.log("err", err);
		console.log("user", user);
		console.log("info", info);
		if (err) {
			return next(err); // Handle any errors that occurred during authentication
		}
		if (!user) {
			// Authentication failed, send a JSON response with a failure message
			return res
				.status(401)
				.json({ success: false, message: "Authentication failed" });
		}

		return res.json({ success: true, message: "Authentication succeeded" });
	})(req, res, next);
	/** invokes passport.authenticate with req,res and next as the arguments */
});

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
	console.log("app is listening in port : 3000");
});
