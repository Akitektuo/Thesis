import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { getTextLength } from "./accessor/text-length-accessor";
import "./App.scss";

const App = () => {
	const [text, setText] = useState("");
	const [response, setResponse] = useState("");

	const sendRequest = async () => {
		const { content } = await getTextLength(text);
		setResponse(content);
	}

	return <div className="container">
		<TextField value={text} onChange={e => setText(e.target.value)} />
		<Button onClick={sendRequest}>Send</Button>
		<Typography>Response: <b>{response}</b></Typography>
	</div>;
}

export default App;
