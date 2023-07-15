import { adminProcedure, t } from "../trpc";

// export const helloRouter = procedure.query(() => "Hello");
export const adminRouter = t.router({
	adminData: adminProcedure.query((ctx) => ctx),
});
