import { Button, Container } from "@mui/material";
import { LogoutButton } from "components";
import { useAuthentication } from "infrastructure";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import UserDashBoard from "./dashboard";
import styles from "./main-page.module.scss";

const MainPage = () => {
    const navigate = useNavigate();
    const { isUserAdmin } = useAuthentication();

    return (
        <Container>
            <LogoutButton />
            {isUserAdmin && (
                <Button onClick={() => navigate("/admin")}>Admin page</Button>
            )}
            <UserDashBoard className={styles.slideElement} />
        </Container>
    );
}

export default observer(MainPage);