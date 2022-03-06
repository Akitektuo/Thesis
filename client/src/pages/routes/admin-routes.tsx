import { useAuthentication } from "infrastructure";
import { observer } from "mobx-react";
import AdminPage from "pages/admin-page";
import { Navigate } from "react-router";
import { ROUTE_INDEX } from "./constants";

const AdminRoutes = () => {
    const { isUserAdmin } = useAuthentication();

    return isUserAdmin === false ? (
        <Navigate to={ROUTE_INDEX} />
    ) : (
        <AdminPage />
    );
}

export default observer(AdminRoutes);