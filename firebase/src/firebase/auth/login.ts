import { auth } from "../firestore";
import { AuthType } from "./signUp";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function login({ email, password }: AuthType) {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			// ...
			console.log("login", user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
}
