import { Navigate, Route, Routes } from "react-router-dom";

const AuthorizedRoutes = () => (
    <Routes>
        <Route path="/" element={<div>Hello auth</div>} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
);

export default AuthorizedRoutes;