// import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import * as trpcExpress from "@trpc/server/adapters/express";
export const createContext = ({}: trpcExpress.CreateExpressContextOptions) => {
	// return { isAdmin: req.headers.authorization == "TOKEN" };
	return { isAdmin: true };
};

export const createWSSContext = () => {
	return { isAdmin: true };
};
