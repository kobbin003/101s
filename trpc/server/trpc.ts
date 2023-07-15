import { initTRPC } from "@trpc/server";
import { createContext } from "./createContext";
import { TRPCError } from "@trpc/server";
export const t = initTRPC.context<typeof createContext>().create();

export const isMiddlware = t.middleware(({ ctx, next, ...prompt }) => {
	if (!ctx.isAdmin) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	// console.log("prompot", prompt);
	return next({ ctx: { authorizedUserName: "kobin" } });
	//* next can take in ctx and change it to pass.
	//* if no argument is passed with next, then the same context is passed to the middlewware/router etc.
});

export const adminProcedure = t.procedure.use(isMiddlware);
