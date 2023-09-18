import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firestore";

onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/auth.user
		// const uid = user.uid;
		// console.log(
		// 	"get-user",
		// 	user.getIdToken().then((res) => console.log(res))
		// );
		// console.log("get-user", auth.currentUser);
		if (user !== null) {
			console.log(user);
		}
		// ...
	} else {
		// User is signed out
		// ...
	}
});
