import { ChangeEvent, FormEvent, useState } from "react";
import { socket } from "../Socket";

type Props = {};

const Send = ({}: Props) => {
	const [message, setMessage] = useState("");

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
		// console.log("deferredValue", deferredValue);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		/** emitting event "myevent*/
		socket.emit(
			"send-message",
			{ roomName: "2-users", message },
			(response: string) => {
				console.log("the arg of server cb", response);
			}
		);
		console.log("submitted");
		setMessage("");
	};

	/** listening for event "hi" */
	socket.on("from-server-event", (msg) => {
		console.log("hi", msg);
	});

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="message"
					id="message"
					value={message}
					onChange={handleOnChange}
				/>
				<button type="submit">send</button>
			</form>
		</div>
	);
};

export default Send;
