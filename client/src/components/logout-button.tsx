import { IconButton } from "components";
import { useAuthentication } from "infrastructure";
import LogoutIcon from "@mui/icons-material/LogoutSharp";

const LogoutButton = () => {
    const { setToken } = useAuthentication();

    return (
        <IconButton title="Logout" color="primary" onClick={() => setToken()}>
            <LogoutIcon />
        </IconButton>
    );
}

export default LogoutButton;