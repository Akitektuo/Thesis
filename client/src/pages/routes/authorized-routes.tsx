import MainPage from "pages/main-page";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthorizedRoutes = () => (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
);

export default AuthorizedRoutes;