import React from "react";
import { socket } from "../Socket";

type Props = {};

const ConnectionManager = (props: Props) => {
	const handleClickConnect = () => {
		socket.connect();
	};
	const handleClickDisConnect = () => {
		socket.disconnect();
	};
	return (
		<div>
			<button onClick={handleClickConnect}>connect</button>
			<button onClick={handleClickDisConnect}>disconnect</button>
		</div>
	);
};

export default ConnectionManager;
