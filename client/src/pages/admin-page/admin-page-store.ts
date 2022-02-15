import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class AdminPageStore {
    public selectedTab: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    public setTab = (tabIndex: number) => this.selectedTab = tabIndex;

    public reset = () => {
        this.selectedTab = 0;
    }
}

export const adminPageStore = new AdminPageStore();
export const AdminPageContext = createContext(adminPageStore);