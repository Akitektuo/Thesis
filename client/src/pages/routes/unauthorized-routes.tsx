import { Route, Routes } from "react-router-dom";

const UnauthorizedRoutes = () => (
    <Routes>
        <Route path="*" element={<div>Hello</div>} />
    </Routes>
);

export default UnauthorizedRoutes;