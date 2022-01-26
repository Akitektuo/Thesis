import { RegisterUserType } from "shared/types/user-types";
import { RulesType } from "validation";

const RegisterPageRules: RulesType<RegisterUserType> = {
    email: {
        required: "The email is required!",
        email: "This should be formatted as an email!"
    },
    password: {
        required: "The password is required!",
        password: "The password should contain at least one small letter, capital letter, a number and a symbol!",
        length: {
            min: 6,
            message: "The password should have at least 6 characters"
        }
    },
    confirmPassword: {
        required: "The confirm password is required!",
        sameAs: {
            reference: "password",
            message: "The passwords should be the same!"
        }
    }
}

export default RegisterPageRules;