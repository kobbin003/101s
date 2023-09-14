import {
	collection,
	addDoc,
	doc,
	deleteDoc,
	getDocs,
} from "firebase/firestore/lite";
import { db } from "./firestore";

export const usersCollRef = collection(db, "users");

export async function addUser() {
	try {
		const docRef = await addDoc(usersCollRef, {
			first: "Ada",
			last: "Lovelace",
			born: 1815,
		});
		console.log("Document written with ID: ", docRef.id);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
}

export async function deleteUser() {
	const docRef = doc(db, "users", "jWsWLeCZMzvz5Bqi5miA");
	console.log(docRef);
	try {
		const deleteRef = await deleteDoc(docRef);
		console.log("Document written with ID: ", deleteRef);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
	console.log(docRef);
}

export async function getAllUsers() {
	try {
		const allDocsSnap = await getDocs(usersCollRef);
		return allDocsSnap;
		// console.log("got all docs ", allDocs.docs);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
}
