import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../login-page";
import RegisterPage from "../register-page";

const UnauthorizedRoutes = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
);

export default UnauthorizedRoutes;