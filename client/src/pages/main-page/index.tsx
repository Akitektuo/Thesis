import { Button } from "@mui/material";
import { LogoutButton } from "components";
import { useAuthentication } from "infrastructure";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    const { isUserAdmin } = useAuthentication();

    return <>
        <LogoutButton />
        {isUserAdmin && (
            <Button onClick={() => navigate("/admin")}>Admin page</Button>
        )}
    </>;
}

export default observer(MainPage);