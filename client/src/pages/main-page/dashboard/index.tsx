import { Button, Paper } from "@mui/material";
import classNames from "classnames";
import {
    IconButton,
    LetterAvatar,
    LevelIndicator,
    LoadingElement,
    LogoutButton,
    Text
} from "components";
import { useAuthentication, useUserInformation } from "infrastructure";
import { observer } from "mobx-react";
import { useNavigate } from "react-router";
import { DisplayBadgeType } from "shared/types/badge-types";
import BadgeList from "./badge-list";
import styles from "./user-dashboard.module.scss";
import AdminPanelIcon from "@mui/icons-material/AdminPanelSettingsSharp";
import { ROUTE_ADMIN, ROUTE_BADGES } from "pages/routes/constants";

interface Props {
    className?: string;
}

const badges: DisplayBadgeType[] = [{
    name: "Test",
    image: "https://img.icons8.com/stickers/256/000000/test-passed.png",
    points: 100,
    unlocked: true
}, {
    name: "Test",
    image: "https://img.icons8.com/stickers/256/000000/test-passed.png",
    points: 100,
    unlocked: true
}, {
    name: "Test",
    image: "https://img.icons8.com/stickers/256/000000/test-passed.png",
    points: 100,
    unlocked: true
}, {
    name: "Test",
    image: "https://img.icons8.com/stickers/256/000000/test-passed.png",
    points: 100,
    unlocked: true
}, {
    name: "Test",
    image: "https://img.icons8.com/stickers/256/000000/test-passed.png",
    points: 100,
    unlocked: true
}, {
    name: "Test",
    image: "https://img.icons8.com/stickers/256/000000/test-passed.png",
    points: 100,
    unlocked: true
}];

const UserDashBoard = ({ className }: Props) => {
    const navigate = useNavigate();
    const { isUserAdmin } = useAuthentication();
    const userDashboard = useUserInformation();

    return (
        <Paper className={classNames(styles.container, className)}>
            {userDashboard ? <>
                <LetterAvatar email={userDashboard.email} />
                <div className={styles.emailAndLevel}>
                    <Text variant="h5" isBold>{userDashboard.email}</Text>
                    <LevelIndicator {...userDashboard} />
                </div>
                <div className={styles.badgesAndActions}>
                    <BadgeList badges={badges} />
                    <div className={styles.actions}>
                        <Button
                            variant="outlined"
                            className={styles.actionSeeAll}
                            onClick={() => navigate(ROUTE_BADGES)}>
                            See all
                        </Button>
                        <div className={styles.accountActions}>
                            <LogoutButton />
                            {isUserAdmin && (
                                <IconButton
                                    title="Admin page"
                                    color="primary"
                                    onClick={() => navigate(ROUTE_ADMIN)}>
                                    <AdminPanelIcon />
                                </IconButton>
                            )}
                        </div>
                    </div>
                </div>
            </> : (
                <LoadingElement className={styles.loading} show />
            )}
        </Paper>
    );
}

export default observer(UserDashBoard);