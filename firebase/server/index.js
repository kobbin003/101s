import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

const firebaseConfig = {
	apiKey: "AIzaSyC6wBC2Kd5S0XevmF_CPS_WIn8Sj4cW7Qs",
	authDomain: "fir-web101.firebaseapp.com",
	projectId: "fir-web101",
	storageBucket: "fir-web101.appspot.com",
	messagingSenderId: "562050164942",
	appId: "1:562050164942:web:0cdd87f7c67f5c5da6489f",
	measurementId: "G-L0FD6RNLB9",
};
const app = initializeApp(firebaseConfig);

const idToken =
	"eyJhbGciOiJSUzI1NiIsImtpZCI6ImFhMDhlN2M3ODNkYjhjOGFjNGNhNzJhZjdmOWRkN2JiMzk4ZjE2ZGMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoia29iaW4gZHV5dSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLT09ocTVEcU8xeThLSW5SYXlTS3UzdXF3ZzRSZVZ0MTdoSEtSNmVmWnZLLVk9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLXdlYjEwMSIsImF1ZCI6ImZpci13ZWIxMDEiLCJhdXRoX3RpbWUiOjE2OTUwNDgwNTAsInVzZXJfaWQiOiJuZjd5MGJZZmxWTW1EVWxjc3ltY1o0S1N1SEozIiwic3ViIjoibmY3eTBiWWZsVk1tRFVsY3N5bWNaNEtTdUhKMyIsImlhdCI6MTY5NTA0ODA1MCwiZXhwIjoxNjk1MDUxNjUwLCJlbWFpbCI6ImRrZmV0b0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwOTI5Njc0NjE4NDEzNTA4NDQ2NyJdLCJlbWFpbCI6WyJka2ZldG9AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.U9pRnR_ILIWdEKO2UkBv0Sr-xI0WPJabpXcv3kCwJ5NWFu5c399OhJl42sAhZDncR_8AIwdm0GE-vlRg7RkxWW3GcSP4Te_U2iteWGTCq_i7JeolP84CQeiVDvlBQgHTeyAlDIOAsFEykHgbWTdesfQDsxqgdlZk8zmE-IwCNmpJIKDZyWNIsU-aLTJj5Rvj8nRNeWJW7oi8LOJaX1QswoLxeCt3DV3MeATs0yc2J_sZgaE5kqoYIC7BrF9tSaRrNaHmWyrARSgFLpmQKsYJ-MZ0d08q2erkNlWFSDe2W7vq_h1rQoC88abf4zrq7Q1jDoPWlwtPhx91cTl6iNwSeA";

admin
	.auth()
	.verifyIdToken(idToken)
	.then(function (decodedToken) {
		var uid = decodedToken.uid;
		// ...
		console.log("decoded", uid, decodedToken);
	})
	.catch(function (error) {
		// Handle error
	});
