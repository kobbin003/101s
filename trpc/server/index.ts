import express from "express";
import cors from "cors";
import { publicProcedure, router } from "./trpc";
import * as trpcExpress from "@trpc/server/adapters/express";

const appRouter = router({
	helloworld: publicProcedure.query(() => "Hello World!"),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
app.use("/", trpcExpress.createExpressMiddleware({ router: appRouter }));

app.listen(3000, () => console.log("server is running on port 3000"));
