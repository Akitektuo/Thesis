import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { PlainBadgeType } from "shared/types/badge-types";
import { badgeGridStore } from "./badge-grid/badge-grid-store";

export class BadgeTabStore {
    public displayAsUnlocked: boolean = false;
    public badgeEdit: PlainBadgeType | null | undefined = undefined;
    
    constructor() {
        makeAutoObservable(this);
    }

    public setDisplayAsUnlocked = (value: boolean) => this.displayAsUnlocked = value;

    public closeDialog = () => this.badgeEdit = undefined;

    public openAddDialog = () => this.badgeEdit = null;

    public openEditDialog = (badge: PlainBadgeType) => this.badgeEdit = badge;

    public onSave = (badge: PlainBadgeType, isAdd: boolean) => {
        const action = isAdd ? badgeGridStore.addBadge : badgeGridStore.updateBadge;

        action(badge);
    }

    public reset = () => {
        this.closeDialog();
    }
}

export const badgeTabStore = new BadgeTabStore();
export const BadgeTabContext = createContext(badgeTabStore);