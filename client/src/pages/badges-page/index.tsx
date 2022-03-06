import { Container } from "@mui/material";
import { Header } from "components";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import BadgeGrid from "./badge-grid";
import { BadgesPageContext } from "./badges-page-store"

const BadgesPage = () => {
    const navigate = useNavigate();
    const { badges, fetchBadges } = useContext(BadgesPageContext);

    useEffect(() => {
        fetchBadges();
    }, [fetchBadges]);

    return (
        <Container>
            <Header title="Badges" onClickBack={() => navigate("/")} />
            <BadgeGrid badges={badges} />
        </Container>
    );
}

export default observer(BadgesPage);