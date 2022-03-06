import { register } from "accessor/authenticate-accessor";
import { loadingService, navigationService, toastService } from "infrastructure";
import { makeAutoObservable } from "mobx";
import { ROUTE_LOGIN } from "pages/routes/constants";
import { createContext } from "react";
import { EMPTY_REGISTER_USER, LoginUserType } from "shared/types/user-types";
import { makeValidator, Validator } from "validation";
import RegisterPageRules from "./register-page-rules";

export class RegisterPageStore {
    public user = EMPTY_REGISTER_USER;
    public validator: Validator<LoginUserType>;

    constructor() {
        makeAutoObservable(this);
        this.validator = makeValidator(this.user, RegisterPageRules);
    }

    public setEmail = (email: string) => this.user.email = email;

    public setPassword = (password: string) => this.user.password = password;

    public setConfirmPassword = (confirmPassword: string) =>
        this.user.confirmPassword = confirmPassword;

    public onSubmit = async () => {
        this.validator.validate();
        if (!this.validator.isValid())
            return;
        
        loadingService.setLoading(true);
        try {
            await register(this.user);
            toastService.showSuccess("Registered successfully");
            navigationService.to(ROUTE_LOGIN);
        } catch (error: any) {
            toastService.showError(error);
        } finally {
            loadingService.setLoading(false);
        }
    }

    public reset = () => {
        this.user = EMPTY_REGISTER_USER;
        this.validator = makeValidator(this.user, RegisterPageRules);
    }
}

export const registerPageStore = new RegisterPageStore();
export const RegisterPageContext = createContext(registerPageStore);