import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class BadgeTabStore {
    public displayAsUnlocked: boolean = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    public setDisplayAsUnlocked = (value: boolean) => this.displayAsUnlocked = value;
}

export const badgeTabStore = new BadgeTabStore();
export const BadgeTabContext = createContext(badgeTabStore);