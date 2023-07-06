import "./App.css";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/index";
import { useEffect, useState } from "react";
const trpc = createTRPCProxyClient<AppRouter>({
	links: [httpBatchLink({ url: "http://localhost:3000" })],
});
function App() {
	const [message, setMessage] = useState("");
	useEffect(() => {
		trpc.helloworld.query().then((res) => setMessage(res));
	}, []);

	return <>{message}</>;
}

export default App;
