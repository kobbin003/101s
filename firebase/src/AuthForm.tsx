import { ChangeEvent, FormEvent, useState } from "react";
import { signUp } from "./firebase/auth/signUp";
import login from "./firebase/auth/login";

type UserFormType = { email: string; password: string };

const AuthForm = ({ type }: { type: "login" | "signup" }) => {
	const [formData, setFormData] = useState<UserFormType>({
		email: "",
		password: "",
	});

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setFormData((prev) => ({ ...prev, [inputName]: inputValue }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
		if (type == "login") {
			login(formData);
		} else {
			signUp(formData);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="form"
		>
			<input
				type="email"
				name="email"
				value={formData.email}
				placeholder="email"
				onChange={handleOnChange}
			/>
			<input
				type="password"
				name="password"
				value={formData.password}
				placeholder="password"
				onChange={handleOnChange}
			/>
			<button type="submit">{type}</button>
		</form>
	);
};

export default AuthForm;
