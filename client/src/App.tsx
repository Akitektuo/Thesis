import { observer } from "mobx-react";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { useAuthentication } from "./infrastructure";
import AuthorizedRoutes from "./pages/routes/authorized-routes";
import UnauthorizedRoutes from "./pages/routes/unauthorized-routes";

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
				<AuthorizedRoutes />
			) : (
				<UnauthorizedRoutes />
			)}
		</BrowserRouter>
	);
}

export default observer(App);
