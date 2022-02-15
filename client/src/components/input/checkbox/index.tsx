import { Checkbox, FormControlLabel } from "@mui/material";
import classNames from "classnames";
import styles from "./checkbox.module.scss";

interface Props {
    value?: boolean;
    label?: string | JSX.Element;
    className?: string;
    onChange?: (value: boolean) => void;
}

const RadioButton = ({ value, label, className, onChange }: Props) => (
    <FormControlLabel
        className={classNames(styles.checkbox, className)}
        value={value}
        onChange={(_, value) => onChange?.(value)}
        control={<Checkbox />}
        label={label || ""} />
);

export default RadioButton;