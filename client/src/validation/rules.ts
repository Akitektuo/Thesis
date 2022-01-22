export type Rules = RequiredRule &
    PatternRule &
    EmailRule &
    PasswordRule &
    LengthRule &
    CustomRule;

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
        callback: (value: any, fieldName: string) => any;
        message: string | ((result: any) => string | null | undefined); 
    }
}