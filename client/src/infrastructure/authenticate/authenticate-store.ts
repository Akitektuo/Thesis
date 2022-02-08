import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { setToken, getToken, clearToken } from "helpers/token-helper";
import { isAdmin } from "accessor/user-accessor";

class AuthenticateStore {
    public isUserLogged?: boolean = undefined;
    public isUserAdmin?: boolean = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public initialize = () => {
        this.isUserLogged = !!getToken();
        this.fetchAdminStatus();
    }

    public setToken = (token?: string) => {
        // eslint-disable-next-line
        if (this.isUserLogged = !!token) {
            setToken(token);
        } else {
            clearToken();
        }
    }

    private fetchAdminStatus = async () => {
        if (!this.isUserLogged)
            return;

        const isUserAdmin = await isAdmin();
        runInAction(() => this.isUserAdmin = isUserAdmin);
    }
}

export const authenticateStore = new AuthenticateStore();
export const AuthenticateContext = createContext(authenticateStore);