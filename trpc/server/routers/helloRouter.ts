import { t } from "../trpc";

// export const helloRouter = procedure.query(() => "Hello");
export const helloRouter = t.router({
	getHello: t.procedure.query(() => "Hello"),
});
