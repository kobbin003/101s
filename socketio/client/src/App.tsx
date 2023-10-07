import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./Socket";
import ConnectionManager from "./components/ConnectionManager";

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
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
			<p>{isConnected ? "connected" : "not connected"}</p>
			<ConnectionManager />
		</>
	);
}

export default App;
