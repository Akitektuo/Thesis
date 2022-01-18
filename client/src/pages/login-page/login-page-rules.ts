import { LoginUserType } from "shared/types/user-types";
import { RulesType } from "validation";

const LoginPageRules: RulesType<LoginUserType> = {
    email: {
        required: "The email is required!"
    },
    password: {
        required: "The password is required!"
    }
}

export default LoginPageRules;