import { ChangeEvent, FormEvent, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./SignUp";
import Login from "./Login";

function App() {
	return (
		<>
			<SignUp />
			<Login />
		</>
	);
}

export default App;
