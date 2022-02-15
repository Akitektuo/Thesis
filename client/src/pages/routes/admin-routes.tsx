import { useAuthentication } from "infrastructure";
import { observer } from "mobx-react";
import AdminPage from "pages/admin-page";
import { Navigate } from "react-router";

const AdminRoutes = () => {
    const { isUserAdmin } = useAuthentication();

    return isUserAdmin === false ? (
        <Navigate to="/" />
    ) : (
        <AdminPage />
    );
}

export default observer(AdminRoutes);