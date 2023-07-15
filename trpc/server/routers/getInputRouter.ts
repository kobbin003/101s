import { t } from "../trpc";
import { z } from "zod";
const mySchema = z.string();
// const mySchema = z.object({ id: z.number() });
// console.log(z.object({ id: z.number() }));
//* ZOD
export const inputRouter = t.router({
	getInput: t.procedure
		.input(mySchema)
		// .output(mySchema)
		.mutation(({ input, ctx }) => {
			//* structure of mutation argument;[hence {input}]
			//  {
			// 	ctx: undefined,
			// 	type: "mutation",
			// 	path: "getInput",
			// 	rawInput: "duyu",
			// 	meta: undefined,
			// 	input: "duyu",
			// 	next: [],
			// };
			return { input, ctx };
		}),
	// .mutation(({ input }) => input),
});

//* VANILLA & ZOD
// export const inputRouter = t.router({
// 	getInput: t.procedure
// 		.input((input) => {
// 			return mySchema.parse(input);
// 		})
// 		.mutation((input) => {
// 			return input;
// 		}),
// });

//* VANILLA
// export const inputRouter = t.router({
// 	getInput: t.procedure
// 		.input((input) => {
// 			if (typeof input == "string") {
// 				return input;
// 			} else {
// 				throw new Error("input must be a string");
// 			}
// 		})
// 		.mutation((input) => {
// 			return input;
// 		}),
// });
