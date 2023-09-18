import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firestore";

export type AuthType = {
	email: string;
	password: string;
};
//heyehy
export function signUp({ email, password }: AuthType) {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			// ...
			console.log("user", user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
			console.log("authError", error);
		});
}
