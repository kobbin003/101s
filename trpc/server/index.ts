import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { t } from "./trpc";
// import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { helloRouter } from "./routers/helloRouter";
import { userRouter } from "./routers/userRouter";
import { inputRouter } from "./routers/getInputRouter";
import { adminRouter } from "./routers/adminRouter";
import { createContext } from "./createContext";
//* 🌟 you can create multiple routes by two ways: appRouter👇 or mergedRouters👇
const appRouter = t.router({
	hello: helloRouter,
	users: userRouter,
	input: inputRouter,
});

const mergedRouters = t.mergeRouters(
	helloRouter,
	userRouter,
	inputRouter,
	adminRouter
);

// export type AppRouter = typeof appRouter;
export type AppRouter = typeof mergedRouters;

//* check client to see the difference between typeof appRouter & typeof mergedRouters.

//! TRPC SERVER
// const server = createHTTPServer({ router: appRouter });
// server.listen(3000);

//!EXPRESS SERVER
const app = express();
app.use(cors());

//* using the express adapter!
// app.use("/", trpcExpress.createExpressMiddleware({ router: appRouter }));
app.use(
	"/",
	trpcExpress.createExpressMiddleware({
		router: mergedRouters,
		createContext,
	})
);

app.listen(3000, () => console.log("server is running on port 3000"));
