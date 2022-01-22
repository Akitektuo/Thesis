import { EMAIL_REGEX, PASSWORD_REGEX } from "./constants";
import { CustomRule, EmailRule, LengthRule, PasswordRule, PatternRule, RequiredRule } from "./rules";

const validateRequired = (value: any, rule: RequiredRule, fieldName: string) => {
    const required = rule?.required;
    if (!required)
        return;

    if (value === undefined || value === null || value === "")
        return required;
}

const validatePattern = (value: any, rule: PatternRule, fieldName: string) => {
    const pattern = rule?.pattern;
    if (!pattern)
        return;

    if (!pattern.value.test(value))
        return pattern.message;
}

const validateEmail = (value: any, rule: EmailRule, fieldName: string) => {
    const emailMessage = rule?.email;
    if (!emailMessage)
        return;

    if (!EMAIL_REGEX.test(value))
        return emailMessage;
}

const validatePassword = (value: any, rule: PasswordRule, fieldName: string) => {
    const passwordMessage = rule?.password;
    if (!passwordMessage)
        return;

    if (!PASSWORD_REGEX.test(value))
        return passwordMessage;
}

const validateLength = (value: any, rule: LengthRule, fieldName: string) => {
    const length = rule?.length;
    if (!length)
        return;

    const { min, max, exclusive, message } = length;
    const valueLength = value?.length ?? 0;

    if (min !== undefined && less(valueLength, min, exclusive))
        return message;

    if (max !== undefined && greater(valueLength, max, exclusive))
        return message;
}

const validateCustom = (value: any, rule: CustomRule, fieldName: string) => {
    const custom = rule?.custom;
    if (!custom)
        return;

    const { message, callback } = custom;
    const result = callback(value, fieldName);

    if (message instanceof Function)
        return message(result);

    if (result)
        return message;
}

const validations = [
    validateRequired,
    validatePattern,
    validateEmail,
    validatePassword,
    validateLength,
    validateCustom
];

const less = (first: any, second: any, inclusive?: boolean) =>
    inclusive ? first <= second : first < second;

const greater = (first: any, second: any, inclusive?: boolean) =>
    inclusive ? first >= second : first > second;

export default validations;