import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { addUser } from "./firebase/functions";

type UserFormType = { name: string; age: string };

const Form = () => {
	const [formData, setFormData] = useState<UserFormType>({ name: "", age: "" });

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setFormData((prev) => ({ ...prev, [inputName]: inputValue }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// remember to turn age from string to number before putting it in firestore
		addUser({ ...formData, age: Number(formData.age) }).then(() => {
			console.log("user added");
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			id="form"
		>
			<input
				type="text"
				name="name"
				value={formData.name}
				placeholder="name"
				onChange={handleOnChange}
			/>
			<input
				type="text"
				name="age"
				value={formData.age}
				placeholder="age"
				onChange={handleOnChange}
			/>
			<button type="submit">add user</button>
		</form>
	);
};

// firebase_lite

// type FormType = { setReRender: React.Dispatch<React.SetStateAction<boolean>> };

// const Form: FC<FormType> = ({ setReRender }) => {
// 	const [formData, setFormData] = useState<UserFormType>({ name: "", age: "" });

// 	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
// 		const inputName = e.target.name;
// 		const inputValue = e.target.value;
// 		setFormData((prev) => ({ ...prev, [inputName]: inputValue }));
// 	};

// 	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		// remember to turn age from string to number before putting it in firestore
// 		addUser({ ...formData, age: Number(formData.age) }).then(() => {
// 			setReRender((prev) => !prev);
// 			console.log("user added");
// 		});
// 	};

// 	useEffect(() => {
// 		console.log(formData);
// 	}, [formData]);

// 	return (
// 		<form
// 			onSubmit={handleSubmit}
// 			id="form"
// 		>
// 			<input
// 				type="text"
// 				name="name"
// 				value={formData.name}
// 				placeholder="name"
// 				onChange={handleOnChange}
// 			/>
// 			<input
// 				type="text"
// 				name="age"
// 				value={formData.age}
// 				placeholder="age"
// 				onChange={handleOnChange}
// 			/>
// 			<button type="submit">add user</button>
// 		</form>
// 	);
// };

export default Form;
