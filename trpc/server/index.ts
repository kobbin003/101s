import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { t } from "./trpc";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
// import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { helloRouter } from "./routers/helloRouter";
import { userRouter } from "./routers/userRouter";
import { inputRouter } from "./routers/getInputRouter";
import { adminRouter } from "./routers/adminRouter";
import { createContext, createWSSContext } from "./createContext";
import ws from "ws";
//* 🌟 you can create multiple routes by two ways: appRouter👇 or mergedRouters👇
const appRouter = t.router({
	hello: helloRouter,
	users: userRouter,
	input: inputRouter,
	admin: adminRouter,
});

const mergedRouters = t.mergeRouters(
	helloRouter,
	userRouter,
	inputRouter,
	adminRouter
);

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
const server = app.listen(3000, () =>
	console.log("server is running on port 3000")
);
applyWSSHandler({
	wss: new ws.Server({ server }),
	router: mergedRouters,
	createContext: createWSSContext,
});

// export type AppRouter = typeof appRouter;
export type AppRouter = typeof mergedRouters;
