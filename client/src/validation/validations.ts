import { compare } from "helpers/comparison";
import { EMAIL_REGEX, PASSWORD_REGEX } from "./constants";
import {
    CustomRule,
    EmailRule,
    LengthRule,
    PasswordRule,
    PatternRule,
    RangeRule,
    RequiredRule,
    SameAsRule
} from "./rules";

const validateRequired = <T>(model: T, value: any, rule: RequiredRule, fieldName: string) => {
    const required = rule?.required;
    if (!required)
        return;

    if (value === undefined || value === null || value === "")
        return required;
}

const validatePattern = <T>(model: T, value: any, rule: PatternRule, fieldName: string) => {
    const pattern = rule?.pattern;
    if (!pattern)
        return;

    if (!pattern.value.test(value))
        return pattern.message;
}

const validateEmail = <T>(model: T, value: any, rule: EmailRule, fieldName: string) => {
    const emailMessage = rule?.email;
    if (!emailMessage)
        return;

    if (!EMAIL_REGEX.test(value))
        return emailMessage;
}

const validatePassword = <T>(model: T, value: any, rule: PasswordRule, fieldName: string) => {
    const passwordMessage = rule?.password;
    if (!passwordMessage)
        return;

    if (!PASSWORD_REGEX.test(value))
        return passwordMessage;
}

const validateLength = <T>(model: T, value: any, rule: LengthRule, fieldName: string) => {
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

const validateCustom = <T>(model: T, value: any, rule: CustomRule, fieldName: string) => {
    const custom = rule?.custom;
    if (!custom)
        return;

    const { message, callback } = custom;
    const result = callback(value, model, fieldName);

    if (message instanceof Function)
        return message(result);

    if (result)
        return message;
}

const validateSameAs = <T>(model: T, value: any, rule: SameAsRule, fieldName: string) => {
    const sameAs = rule?.sameAs;
    if (!sameAs)
        return;

    const { reference, contains, ignoreCase, message } = sameAs;

    const referenceValue = (model as any)[reference];

    if (!compare(value, referenceValue, contains, ignoreCase))
        return message;
}

const validateRange = <T>(model: T, value: any, rule: RangeRule, fieldName: string) => {
    const range = rule?.range;
    if (!range)
        return;

    const { min, max, exclusive, message } = range;

    if (min !== undefined && less(value, min, exclusive))
        return message;

    if (max !== undefined && greater(value, max, exclusive))
        return message;
}

const validations = [
    validateRequired,
    validatePattern,
    validateEmail,
    validatePassword,
    validateLength,
    validateCustom,
    validateSameAs,
    validateRange
];

const less = (first: any, second: any, inclusive?: boolean) =>
    inclusive ? first <= second : first < second;

const greater = (first: any, second: any, inclusive?: boolean) =>
    inclusive ? first >= second : first > second;

export default validations;