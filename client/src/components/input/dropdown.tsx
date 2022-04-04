import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { generateUid } from "helpers/random";
import { useRef } from "react";

export interface DropdownOption<T> {
    value: T;
    display: JSX.Element | string;
    defaultValue?: boolean;
}

interface Props<T> {
    value: T;
    options: DropdownOption<T>[];
    label?: string;
    className?: string;
    onChange: (value: T) => void;
}

const Dropdown = <T extends unknown>({ value, options, label, className, onChange }: Props<T>) => {
    const uid = useRef(generateUid());

    const labelId = `dropdown-label-${uid.current}`;
    const defaultValue = options.find(({ defaultValue }) => defaultValue)?.value;

    const handleChange = (value: T | string | null) =>
        onChange((value === "" ? null : value) as T);

    return (
        <FormControl className={className} fullWidth>
            {!!label && (
                <InputLabel id={labelId}>{label}</InputLabel>
            )}
            <Select
                labelId={labelId}
                value={value}
                label={label}
                defaultValue={defaultValue}
                onChange={event => handleChange(event.target.value)}>
                {options.map(({value, display}, index) => (
                    <MenuItem key={index} value={value as any}>{display}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default Dropdown;