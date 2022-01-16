import { createContext } from "react";

export class LoginPageStore {

}

export const loginPageStore = new LoginPageStore();
export const LoginPageContext = createContext(loginPageStore);