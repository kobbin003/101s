import { t } from "../trpc";
import { z } from "zod";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";
const mySchema = z.string();
// type outputSchemaType = { input: string; ctx: { isAdmin: boolean } };
//* ZOD
const ee = new EventEmitter();
export const inputRouter = t.router({
	getInput: t.procedure
		.input(mySchema)
		// .output(outputSchemaType)
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
			ee.emit(
				"log",
				input
			); /** fires the "log" event; emits input to whoever is subscribed to "log" event through emit.next*/
			return { input, ctx };
		}),
	onUpdate: t.procedure.subscription(() =>
		observable<string>((emit) => {
			// Reisters the "log" event
			// It triggers the event handler whenever the "log" event is fired.
			ee.on("log", emit.next);
			return () => {
				/** Unregisters the "log" event */
				ee.off("log", emit.next);
			};
		})
	),
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
