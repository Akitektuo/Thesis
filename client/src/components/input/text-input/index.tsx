import { TextField } from "@mui/material";
import { useForceUpdate } from "infrastructure";
import { observer } from "mobx-react";
import { InputHTMLAttributes } from "react";
import { Validator } from "validation";
import { AutoCompleteType } from "./types";

interface Props {
    className?: string;
    label?: string;
    autoComplete?: AutoCompleteType;
    value?: string;
    type?: InputHTMLAttributes<unknown>["type"];
    validator?: Validator<any>;
    fieldName?: string;
    onChange?: (value: string) => void;
    onKeyPress?: (key: string) => void;
}

const TextInput = ({ onChange, onKeyPress, validator, fieldName, ...other }: Props) => {
    useForceUpdate();

    if (validator && !fieldName) {
        console.error("The validator needs a field name to work");
        return null;
    }

    const validatorProps: any = validator?.propsForField(fieldName || "") ?? {};

    return (
        <TextField
            {...other}
            {...validatorProps}
            onChange={event => {
                onChange?.(event.target.value);
                validatorProps?.onChange?.();
            }}
            onKeyPress={event => onKeyPress?.(event.key)} />
    )
};

export default observer(TextInput);