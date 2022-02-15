import { Button } from "@mui/material";
import { useAuthentication } from "infrastructure";

const LogoutButton = () => {
    const { setToken } = useAuthentication();

    return (
        <Button onClick={() => setToken()}>Logout</Button>
    );
}

export default LogoutButton;