import "./App.css";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/index";
import { useEffect, useState } from "react";

const trpc = createTRPCProxyClient<AppRouter>({
	links: [httpBatchLink({ url: "http://localhost:3000" })],
});
// TODO
function App() {
	const [message, setMessage] = useState("");
	const [user, setUser] = useState("");
	const [adminName, setAdminName] = useState("");
	const handleClick = () => {
		const input = user == "kob" ? "duyu" : "kob";
		//* typeof appRouter
		// trpc.input.getInput.mutate(input).then((res) => setUser(res.input));
		//* typeof mergedRouter
		trpc.getInput.mutate(input).then((res) => {
			setUser(res.input);
		});
	};
	const handleLogin = () => {
		trpc.adminData
			.query()
			.then((res) => setAdminName(res.ctx.authorizedUserName));
	};
	useEffect(() => {
		//* typeof appRouter
		// trpc.hello.getHello.query().then((res) => setMessage(res));
		// trpc.users.getUser.query().then((res) => setUser(res.name));

		//* typeof mergedRouter
		trpc.getHello.query().then((res) => setMessage(res));
		trpc.getUser.query().then((res) => setUser(res.name));
	}, []);

	return (
		<>
			<button onClick={handleLogin}>login</button>
			<p>ADMIN:{adminName}</p>
			{message}&nbsp;{user}
			<button onClick={handleClick}>clickme</button>
		</>
	);
}

export default App;
