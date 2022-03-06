import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../login-page";
import RegisterPage from "../register-page";
import { ROUTE_LOGIN, ROUTE_REGISTER } from "./constants";

const UnauthorizedRoutes = () => (
    <Routes>
        <Route path={ROUTE_LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_REGISTER} element={<RegisterPage />} />
        <Route path="*" element={<Navigate to={ROUTE_LOGIN} />} />
    </Routes>
);

export default UnauthorizedRoutes;