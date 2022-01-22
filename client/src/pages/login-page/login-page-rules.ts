import { LoginUserType } from "shared/types/user-types";
import { RulesType } from "validation";

const LoginPageRules: RulesType<LoginUserType> = {
    email: {
        required: "The email is required!",
        email: "This should be formatted as an email!"
    },
    password: {
        required: "The password is required!"
    }
}

export default LoginPageRules;