import { ChangeEvent, FormEvent, useEffect, useState } from "react";

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
	};

	useEffect(() => {
		console.log(formData);
	}, [formData]);

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

export default Form;
