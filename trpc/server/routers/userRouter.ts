import { t } from "../trpc";

export const userRouter = t.router({
	getUser: t.procedure.query(() => ({ id: 1, name: "kob" })),
});
