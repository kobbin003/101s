import React, { ChangeEvent, FormEvent, useState } from "react";

type Props = {};

const SignUp = (props: Props) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setFormData((prev) => ({ ...prev, [inputName]: inputValue }));
	};

	function handleFormSubmitSignUp(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const options = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(formData),
		};

		fetch("http://localhost:3000/register", options)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Network response was not ok");
				}
				return res.json();
			})
			.then((res) => console.log("res", res));
	}
	return (
		<form
			onSubmit={handleFormSubmitSignUp}
			key={1}
		>
			{["name", "email", "password"].map((item) => (
				<div key={item}>
					<label htmlFor={item}>{item}</label>
					<input
						type={item}
						name={item}
						id={item}
						onChange={handleOnChange}
					/>
				</div>
			))}

			<button type="submit">signup</button>
		</form>
	);
};

export default SignUp;
