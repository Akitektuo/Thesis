import { getUserDashboard } from "accessor/user-accessor";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { UserDashboardType } from "shared/types/user-types";

export class UserDashboardStore {
    public userDashboard: UserDashboardType | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public fetchUserDashboard = async () => {
        const userDashboard = await getUserDashboard();
        runInAction(() => this.userDashboard = userDashboard);
    }
}

export const userDashboardStore = new UserDashboardStore();
export const UserDashboardContext = createContext(userDashboardStore);