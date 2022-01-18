import { observer } from "mobx-react";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { Services, useAuthentication } from "infrastructure";
import { AuthorizedRoutes, UnauthorizedRoutes } from "pages/routes";

const App = () => {
	const { initialize, isUserLogged } = useAuthentication();

	useEffect(() => {
		initialize();
	}, [initialize]);

	if (isUserLogged === undefined)
		return null;

	return <>
		<BrowserRouter>
			{isUserLogged ? (
				<AuthorizedRoutes />
			) : (
				<UnauthorizedRoutes />
			)}
		</BrowserRouter>
		<Services />
	</>;
}

export default observer(App);
