import { Paper } from "@mui/material";
import classNames from "classnames";
import { ChapterSolutionResultType } from "shared/types/chapter-types";
import styles from "./solution-result.module.scss";
import PendingIcon from "@mui/icons-material/MoreHorizSharp";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import ErrorCircleIcon from "@mui/icons-material/ErrorOutlineSharp";
import { Text } from "components";

interface Props extends ChapterSolutionResultType {
    className?: string;
}

const SolutionResult = ({ approved, message, className }: Props) => {
    const noAttempt = !approved && !message;
    const Icon = noAttempt ? PendingIcon : approved ? CheckCircleIcon : ErrorCircleIcon;
    const defaultMessage = noAttempt ? "There is no solution submitted yet..." : "Congratulations! Your solution was approved!";

    return (
        <Paper elevation={4} className={classNames(styles.solutionResultContainer, className, {
            [styles.greenBackground]: approved,
            [styles.yellowBackground]: noAttempt
        })}>
            <Icon htmlColor="white" fontSize="large" />
            <Text className={styles.message} isBold>{message || defaultMessage}</Text>
        </Paper>
    );
}

export default SolutionResult;