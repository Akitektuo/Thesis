export type Rules = RequiredRule &
    PatternRule &
    EmailRule &
    PasswordRule &
    LengthRule &
    CustomRule &
    SameAsRule &
    RangeRule;

export type RequiredRule = {
    required?: string;
}

export type PatternRule = {
    pattern?: {
        value: RegExp,
        message: string
    };
}

export type EmailRule = {
    email?: string;
}

export type PasswordRule = {
    password?: string;
}

export type LengthRule = {
    length?: {
        min?: number;
        max?: number;
        message: string;
        exclusive?: boolean; 
    }
}

export type CustomRule = {
    custom?: {
        callback: (value: any, model: any, fieldName: string) => any;
        message: string | ((result: any) => string | null | undefined); 
    }
}

export type SameAsRule = {
    sameAs?: {
        reference: string;
        contains?: boolean;
        ignoreCase?: boolean;
        message: string;
    }
}

export type RangeRule = {
    range?: {
        min?: number;
        max?: number;
        message: string;
        exclusive?: boolean; 
    }
}