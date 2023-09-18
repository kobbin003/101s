import { useEffect, useState } from "react";
import "./App.css";
import { getAllUsers, usersCollRef } from "./firebase/functions";
import {
	DocumentData,
	QueryDocumentSnapshot,
	onSnapshot,
} from "firebase/firestore";
import Form from "./Form";
import User from "./User";
// import "./firebase/auth";
import "./firebase/auth/getUser";
import AuthForm from "./AuthForm";
import googleLogin from "./firebase/auth/googleAuth";
function App() {
	const [users, setUsers] = useState<DocumentData | undefined>();

	useEffect(() => {
		getAllUsers().then((res) => setUsers(res?.docs));

		const unsubscribe = onSnapshot(usersCollRef, (snapshots) => {
			setUsers(snapshots.docs);
		});
		return () => unsubscribe();
	}, []);

	return (
		/** CRUD */
		// <div id="container">
		// 	<div id="users">
		// 		{users &&
		// 			users.map((user: QueryDocumentSnapshot) => {
		// 				const userData = user.data();
		// 				return (
		// 					<User
		// 						name={userData.name}
		// 						age={userData.age}
		// 						key={user.id}
		// 						id={user.id}
		// 					/>
		// 				);
		// 			})}
		// 	</div>
		// 	<div>
		// 		<Form />
		// 	</div>
		// </div>

		/** Authentication */
		<>
			<AuthForm type="signup" />
			<AuthForm type="login" />
			<button onClick={() => googleLogin()}>Google LogIn</button>
		</>
	);
}

// for firebase-lite
// function App() {
// 	const [users, setUsers] = useState<DocumentData | undefined>();
// 	const [reRender, setReRender] = useState(false);

// 	useEffect(() => {
// 		getAllUsers().then((res) => setUsers(res?.docs));
// 	}, [reRender]);

// 	return (
// 		<div id="container">
// 			<div id="users">
// 				{users &&
// 					users.map((user: QueryDocumentSnapshot) => {
// 						const userData = user.data();
// 						console.log(user.id);
// 						return (
// 							<User
// 								name={userData.name}
// 								age={userData.age}
// 								key={user.id}
// 							/>
// 						);
// 					})}
// 			</div>
// 			<div>
// 				<Form setReRender={setReRender} />
// 			</div>
// 		</div>
// 	);
// }

export default App;
