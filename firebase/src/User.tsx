import { FC, useState } from "react";
import { deleteUser } from "./firebase/functions";
import UpdateForm from "./UpdateForm";
export type UserType = {
	name: string;
	age: number | null;
	id: string;
};

const User: FC<UserType> = ({ name, age, id }) => {
	const [showUpdateForm, setShowUpdateForm] = useState(false);

	const handleClickRemoveUser = () => {
		deleteUser(id);
	};

	const handleClickUpdateUser = () => {
		setShowUpdateForm(true);
	};

	return (
		<div id="user">
			{showUpdateForm ? (
				<UpdateForm
					setShowUpdateForm={setShowUpdateForm}
					name={name}
					age={age?.toString()}
					id={id}
				/>
			) : (
				<div className="userInfo">
					<p>{name}</p>
					<p>{age}</p>
					<button onClick={handleClickUpdateUser}>update</button>
				</div>
			)}
			<button onClick={handleClickRemoveUser}>remove</button>
		</div>
	);
};

export default User;
