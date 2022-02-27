import { Button, Paper } from "@mui/material";
import classNames from "classnames";
import { LetterAvatar, LevelIndicator, LoadingElement, LogoutButton, Text } from "components";
import { useAuthentication } from "infrastructure";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { DisplayBadgeType } from "shared/types/badge-types";
import BadgeList from "./badge-list";
import { UserDashboardContext } from "./user-dashboard-store";
import styles from "./user-dashboard.module.scss";

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
    const { userDashboard, fetchUserDashboard } = useContext(UserDashboardContext);

    useEffect(() => {
        fetchUserDashboard();
    }, [fetchUserDashboard]);

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
                        <Button variant="outlined">See all</Button>
                        {isUserAdmin && (
                            <Button onClick={() => navigate("/admin")}>Admin page</Button>
                        )}
                        <LogoutButton />
                    </div>
                </div>
            </> : (
                <LoadingElement className={styles.loading} show />
            )}
        </Paper>
    );
}

export default observer(UserDashBoard);