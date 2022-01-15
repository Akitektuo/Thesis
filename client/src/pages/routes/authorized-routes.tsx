import { Route, Routes } from "react-router-dom";

const AuthorizedRoutes = () => (
    <Routes>
        <Route path="*" element={<div>Hello auth</div>} />
    </Routes>
);

export default AuthorizedRoutes;