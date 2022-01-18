import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { EMPTY_LOGIN_USER, LoginUserType } from "shared/types/user-types";
import { makeValidator, Validator } from "validation";
import LoginPageRules from "./login-page-rules";

export class LoginPageStore {
    public user = EMPTY_LOGIN_USER;
    public validator: Validator<LoginUserType>;

    constructor() {
        makeAutoObservable(this);
        this.validator = makeValidator(this.user, LoginPageRules);
    }

    public setEmail = (email: string) => this.user.email = email;

    public setPassword = (password: string) => this.user.password = password;

    public onSubmit = () => {
        this.validator.validate();
    }

    public reset = () => {
        this.user = EMPTY_LOGIN_USER;
        this.validator.reset();
    }
}

export const loginPageStore = new LoginPageStore();
export const LoginPageContext = createContext(loginPageStore);