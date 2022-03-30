import { getUserDashboard } from "accessor/user-accessor";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { UserDashboardType } from "shared/types/user-types";

export class UserInformationStore {
    public userInformation: UserDashboardType | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public fetchUserInformation = async () => {
        const userInformation = await getUserDashboard();
        runInAction(() => this.userInformation = userInformation);
    }
}

export const userInformationStore = new UserInformationStore();
export const UserInformationContext = createContext(userInformationStore);