export type NoInfer<T> = [T][T extends any ? 0 : never];

export type AnnotationsMap<T, V, AdditionalFields extends PropertyKey> = {
    [P in Exclude<keyof T, "toString">]?: V;
} & Record<AdditionalFields, V>;

export type RulesType<T extends object, AdditionalKeys extends PropertyKey = never> =
    AnnotationsMap<T, Rule, NoInfer<AdditionalKeys>>;

export type Rule = Required;

export type Required = {
    required?: boolean | string;
}

export type ValidationResult = {
    valid: boolean;
    errorMessage: string;
}

export type ValidationState = ValidationResult & {
    shouldShow: boolean;
}

export type ValidationStates<T extends object, AdditionalKeys extends PropertyKey = never> =
    AnnotationsMap<T, ValidationState, NoInfer<AdditionalKeys>>;