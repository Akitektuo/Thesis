import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <Button onClick={() => navigate("/admin")}>Admin page</Button>
    );
}

export default MainPage;