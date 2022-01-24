import { login } from "accessor/authenticate-accessor";
import { authenticateService, loadingService, toastService } from "infrastructure";
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

    public onSubmit = async () => {
        this.validator.validate();
        if (!this.validator.isValid())
            return
        
        loadingService.setLoading(true);
        try {
            const token = await login(this.user);
            authenticateService.setToken(token);
            toastService.showSuccess("Logged in successfully");
        } catch (error: any) {
            toastService.showError(error);
        } finally {
            loadingService.setLoading(false);
        }
    }

    public reset = () => {
        this.user = EMPTY_LOGIN_USER;
        this.validator.reset();
    }
}

export const loginPageStore = new LoginPageStore();
export const LoginPageContext = createContext(loginPageStore);