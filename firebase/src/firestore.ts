import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC6wBC2Kd5S0XevmF_CPS_WIn8Sj4cW7Qs",
	authDomain: "fir-web101.firebaseapp.com",
	projectId: "fir-web101",
	storageBucket: "fir-web101.appspot.com",
	messagingSenderId: "562050164942",
	appId: "1:562050164942:web:0cdd87f7c67f5c5da6489f",
	measurementId: "G-L0FD6RNLB9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
