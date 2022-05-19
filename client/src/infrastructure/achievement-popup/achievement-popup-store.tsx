import { createContext } from "react";
import { DisplayBadgeType } from "shared/types/badge-types";

export class AchievementPopupStore {
    public badge: DisplayBadgeType | null = null;
}

export const achievementPopupStore = new AchievementPopupStore();
export const AchievementPopupContext = createContext(achievementPopupStore);