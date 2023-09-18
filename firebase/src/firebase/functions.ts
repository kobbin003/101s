import {
	collection,
	addDoc,
	doc,
	deleteDoc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
// import {
// 	collection,
// 	addDoc,
// 	doc,
// 	deleteDoc,
// 	getDocs,
// } from "firebase/firestore/lite";
import { db } from "./firestore";
import { UserDocType } from "../UserSchema";

export const usersCollRef = collection(db, "users");

export async function addUser({ name, age }: UserDocType) {
	try {
		const docRef = await addDoc(usersCollRef, {
			name,
			age,
		});
		console.log("Document written with ID: ", docRef.id);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
}

export async function deleteUser(id: string) {
	const docRef = doc(db, "users", `${id}`);
	try {
		const deleteRef = await deleteDoc(docRef);
		console.log("Document deleted with ID: ", deleteRef);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
}

export async function updateUser(
	id: string,
	data: { name: string; age: number }
) {
	const docRef = doc(db, "users", `${id}`);
	try {
		await updateDoc(docRef, data);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
}

export async function getAllUsers() {
	try {
		const allDocsSnap = await getDocs(usersCollRef);
		return allDocsSnap;
	} catch (error) {
		console.error("Error getting all documents: ", error);
	}
}
