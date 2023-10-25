import express from "express";
import { tweetRouter } from "./routes/tweet.js";
import { errorHandler } from "./errorHandler.js";
import { notFound } from "./notFound.js";
import logger from "morgan";
const app = express();
const PORT = 3000;
// app.use(cors());
app.use(express.json());
// logger logs only 4xx and 5xx status responses to console.
app.use(logger("dev", { skip: (req, res) => res.statusCode < 400 }));
// (async () => {
// 	runX();
// })();
app.use("/tweet", tweetRouter);
app.use((req, res, next) => {
    // next(createHttpError(404, "page not found!"));
    /** prefere notFound, because the status is always 200 for createHttpError */
    notFound(req, res, next);
});
// error handler
app.use(errorHandler);
app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
//# sourceMappingURL=index.js.map