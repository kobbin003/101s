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

/** setting ejs */
app.set("view-engine", "ejs");

/** setting __dirname in esmodule */
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

app.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	const saltRounds = 10;
	const hashedPass = await bcrypt.hash(password, saltRounds);
	app.locals.user = { name, email, password: hashedPass, id: 1 };
	res.redirect("/login");
});

app.get("/login", (req, res) => {
	res.render("login.ejs", {
		formName: "Login",
		inputs: ["email", "password"],
	});
});

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/user",
		failureRedirect: "/login",
		failureFlash: true,
	})
);

app.get("/user", (req, res) => {
	res.render("index.ejs", { name: app.locals.user.name });
});

/** any route that has letters after /
 * AND that does not match above routes
 * //* SINCE express reads from top to bootm. */
app.get(/\/.+/, (req, res, next) => next(createError(404)));
/** use createError, instead of custom notFound middleware  */
// app.use(/\/.+/, notFound);

app.get("/", (req, res) => {
	req.flash("error", "Flash Message Added");
	res.render("signup.ejs", {
		formName: "Signup",
		inputs: ["name", "email", "password"],
	});
});

app.use(errorHandler);

app.listen(3000, () => {
	console.log("app is listening in port : 3000");
});
