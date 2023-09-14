import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { addUser, deleteUser, getAllUsers } from "./functionsFirebase";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import Form from "./Form";
import User from "./User";
export type UserType = {
	name: string;
	age: number | null;
};
function App() {
	const [users, setUsers] = useState<DocumentData | undefined>();

	useEffect(() => {
		// addUser();
		// deleteUser();
		getAllUsers().then((res) => setUsers(res?.docs));
	}, []);
	useEffect(() => {
		console.log(users);
	}, [users]);
	return (
		<div id="container">
			<div id="users">
				{users &&
					users.map((user: QueryDocumentSnapshot) => {
						const userData = user.data();
						console.log(user.id);
						return (
							<User
								name={userData.name}
								age={userData.age}
								key={user.id}
							/>
						);
					})}
			</div>
			<div>
				<Form />
			</div>
		</div>
	);
}

export default App;
