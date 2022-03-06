import { getAllBadgesForUser } from "accessor/badge-accessor";
import { loadingService } from "infrastructure";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { DisplayBadgeType } from "shared/types/badge-types";

export class BadgesPageStore {
    public badges: DisplayBadgeType[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    public fetchBadges = async () => {
        loadingService.setLoading(true);

        const badges = await getAllBadgesForUser();

        runInAction(() => {
            this.badges = badges;
        });
        loadingService.setLoading(false);
    }
}

export const badgesPageStore = new BadgesPageStore();
export const BadgesPageContext = createContext(badgesPageStore);