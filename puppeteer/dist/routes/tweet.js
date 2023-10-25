import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
    const id = req.query.id;
    res.json({ id });
});
export { router as tweetRouter };
//# sourceMappingURL=tweet.js.map