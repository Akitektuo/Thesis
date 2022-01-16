import { Route, Routes } from "react-router-dom";
import LoginPage from "../login-page";

const UnauthorizedRoutes = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
    </Routes>
);

export default UnauthorizedRoutes;