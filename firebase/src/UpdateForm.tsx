import { ChangeEvent, FC, FormEvent, useState } from "react";
import { addUser, updateUser } from "./firebase/functions";

type UserFormType = { name: string; age: string | undefined };

type UpdateFormType = UserFormType & {
	setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
	id: string;
};

const UpdateForm: FC<UpdateFormType> = ({
	setShowUpdateForm,
	name,
	age,
	id,
}) => {
	const [formData, setFormData] = useState<UserFormType>({ name, age });

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setFormData((prev) => ({ ...prev, [inputName]: inputValue }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// remember to turn age from string to number before putting it in firestore
		updateUser(id, { ...formData, age: Number(formData.age) }).then(() => {
			console.log("user added");
			setShowUpdateForm(false);
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			id="form__update"
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
			<button type="submit">done</button>
		</form>
	);
};

export default UpdateForm;
