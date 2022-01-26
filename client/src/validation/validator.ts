import { debounce } from "@mui/material";
import { readProperty } from "helpers/low-level";
import { forceUpdateService } from "infrastructure";
import { Rules } from "./rules";
import { RulesType, ValidationResult, ValidationState } from "./types";
import validations from "./validations";
import "shared/extensions";

export default class Validator<T extends object> {
    private model: T
    private rules: RulesType<T>
    public states: Record<string, ValidationState> = {};

    constructor(model: T, rules: RulesType<T>) {
        this.model = model;
        this.rules = rules;
        this.validateWithoutDebounce();
    }

    public validate = debounce(() => {
        this.validateWithoutDebounce(true);
        forceUpdateService.rerender();
    }, 250);

    public validateField = (fieldName: string, shouldShowDefault = false) => {
        const shouldShow = shouldShowDefault || !!this.states[fieldName]?.shouldShow;
        const rule = readProperty(this.rules, fieldName);

        return this.states[fieldName] = {
            shouldShow,
            ...this.validateValue(readProperty(this.model, fieldName), rule as Rules, fieldName)
        };
    }

    public propsForField = (fieldName: string) => {
        const { errorMessage, shouldShow } = this.validateField(fieldName);
        const error = shouldShow && errorMessage;

        return {
            onChange: () => this.handleChange(fieldName),
            onBlur: () => {
                const { shouldShow: shouldShowAfterBlur } = this.handleChange(fieldName);
                if (!shouldShow && shouldShowAfterBlur)
                    forceUpdateService.rerender();
            },
            error: !!error,
            helperText: error || ""
        };
    }

    public isValid = () => Object.values(this.states).every(({ valid }) => valid);

    public isSubmitDisabled = () =>
        Object.values(this.states).some(({ valid, shouldShow }) => !valid && shouldShow);

    public reset = () => {
        for (const [key, rule] of Object.entries(this.rules)) {
            this.states[key] = {
                shouldShow: false,
                ...this.validateValue(readProperty(this.model, key), rule as Rules, key)
            }
        }
    }

    private handleChange = (fieldName: string) => this.validateField(fieldName, true);

    private validateWithoutDebounce = (shouldShowDefault = false) => {
        for (const [key, rule] of Object.entries(this.rules)) {
            this.states[key] = {
                shouldShow: shouldShowDefault || !!this.states[key]?.shouldShow,
                ...this.validateValue(readProperty(this.model, key), rule as Rules, key)
            }
        }
    }

    private validateValue = (value: any, rules: Rules, fieldName: string): ValidationResult => {
        const error = validations.mapFirst(callback =>
            callback(this.model, value, rules, fieldName));

        return {
            valid: !error,
            errorMessage: error || ""
        };
    }
}
