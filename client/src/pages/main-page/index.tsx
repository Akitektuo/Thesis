import { Container } from "@mui/material";
import { observer } from "mobx-react";
import UserDashBoard from "./dashboard";
import styles from "./main-page.module.scss";

const MainPage = () => {

    return (
        <Container>
            <UserDashBoard className={styles.slideElement} />
        </Container>
    );
}

export default observer(MainPage);