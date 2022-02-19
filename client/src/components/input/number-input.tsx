import { TextInput } from "components";
import { InputNumber } from "shared/types";
import { Validator } from "validation";

interface Props {
    className?: string;
    label?: string;
    value?: InputNumber;
    validator?: Validator<any>;
    fieldName?: string;
    onChange?: (value: InputNumber) => void;
}

const NumberInput = ({ value, onChange, ...otherProps }: Props) => {
    const valueAsString = (value ?? "") as string;

    const handleChange = (newValue: string) => {
        if (!newValue)
            return onChange?.(null);

        onChange?.(Number(newValue));
    }

    return (
        <TextInput
            {...otherProps}
            type="number"
            value={valueAsString}
            onChange={handleChange} />
    );
}

export default NumberInput;