import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./Socket";
import ConnectionManager from "./components/ConnectionManager";
import Send from "./components/Send";

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);

	const [messages, setMessages] = useState<string[]>(["hell"]);

	const [room, setRoom] = useState("");
	const handleJoinRoom = () => {
		socket.emit("join-room", "2-users", (res: string) => {
			console.log(`joined room ${res}`);
			setRoom("2-users");
		});
	};

	useEffect(() => {
		socket.on("new-message", (message) => {
			console.log("got new message", message);
			setMessages((prev) => [...prev, message]);
		});
	}, []);

	useEffect(() => {
		const onConnect = () => {
			console.log(socket.id);
			setIsConnected(true);
		};

		const onDisConnect = () => {
			setIsConnected(false);
		};

		socket.on("connect", onConnect);

		socket.on("disconnect", onDisConnect);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisConnect);
		};
	}, []);

	return (
		<>
			<ConnectionManager />
			<p>{isConnected ? "connected" : "not connected"}</p>
			{room && <p>joined room:{room}</p>}
			<button onClick={handleJoinRoom}>join room</button>
			<Send />
			<div style={{ display: "flex", flexDirection: "column" }}>
				{messages.length > 0 &&
					messages.map((message, index) => <p key={index}>{message}</p>)}
			</div>
		</>
	);
}

export default App;
