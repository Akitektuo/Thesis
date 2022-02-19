import { getAllBadges } from "accessor/badge-accessor";
import { loadingService } from "infrastructure";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { PlainBadgeType } from "shared/types/badge-types";

export class BadgeGridStore {
    public badges: PlainBadgeType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public fetchBadges = async () => {
        loadingService.setLoading(true);

        const badges = await getAllBadges();
        runInAction(() => this.badges = badges);
        
        loadingService.setLoading(false);
    }

    public addBadge = (badge: PlainBadgeType) => this.badges.push(badge);

    public updateBadge = (badge: PlainBadgeType) =>
        this.badges.update(badge, ({ id }) => id === badge.id);
}

export const badgeGridStore = new BadgeGridStore();
export const BadgeGridContext = createContext(badgeGridStore);