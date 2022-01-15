import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { useAuthentication } from "./infrastructure";

const App = () => {
	const { initialize, isUserLogged } = useAuthentication();
	
	useEffect(() => {
		initialize();
	}, [initialize]);

	if (isUserLogged === undefined)
		return null;

	return (
		<BrowserRouter>
			{isUserLogged ? (
				// <PageRoutes />
				<div>Logged</div>
			) : (
				<div>Not logged</div>
				// <AccountRoutes />
			)}
		</BrowserRouter>
	);
}

export default App;
