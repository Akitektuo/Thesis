import { Paper } from "@mui/material";
import classNames from "classnames";
import { LetterAvatar, LevelIndicator, LoadingElement, Text } from "components";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
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
                </div>
            </> : (
                <LoadingElement className={styles.loading} show />
            )}
        </Paper>
    );
}

export default observer(UserDashBoard);