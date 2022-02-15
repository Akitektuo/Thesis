import MainPage from "pages/main-page";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./admin-routes";

const AuthorizedRoutes = () => (
    <Routes>
        <Route path="/admin" element={<AdminRoutes />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
);

export default AuthorizedRoutes;