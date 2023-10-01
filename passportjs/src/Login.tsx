import React, { ChangeEvent, FormEvent, useState } from "react";

type Props = {};

const Login = (props: Props) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setFormData((prev) => ({ ...prev, [inputName]: inputValue }));
	};

	function handleFormSubmitLogin(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const options = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(formData),
		};
		console.log(formData);
		fetch("http://localhost:3000/login", options)
			.then((res) => {
				if (!res.ok) {
					// throw new Error("Network response was not ok");
					return res.json();
				}
				return res.json();
			})
			.then((res) => console.log("res", res));
	}
	return (
		<form
			onSubmit={handleFormSubmitLogin}
			key={2}
		>
			{["email", "password"].map((item) => (
				<div key={item + "y"}>
					<label htmlFor={item}>{item}</label>
					<input
						type={item}
						name={item}
						id={item}
						onChange={handleOnChange}
					/>
				</div>
			))}

			<button type="submit">Login</button>
		</form>
	);
};

export default Login;
