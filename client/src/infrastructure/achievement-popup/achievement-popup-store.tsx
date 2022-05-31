import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { BASE_URL } from "accessor/constants";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { DisplayBadgeType } from "shared/types/badge-types";

export class AchievementPopupStore {
    public badge: DisplayBadgeType | null = null;
    private hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public initialize = () => {
        if (this.hubConnection)
            return;

        this.hubConnection = new HubConnectionBuilder().withUrl(`${BASE_URL}/achievement`)
            .withAutomaticReconnect()
            .build();
        
        this.startWebSocket();
        
        return () => {
            this.hubConnection?.stop().then(() => this.hubConnection = null);
        }
    }

    private startWebSocket = async () => {
        await this.hubConnection?.start();

        this.hubConnection?.on("new", this.setBadge);
    }

    private setBadge = (badge: DisplayBadgeType) => {
        this.badge = badge;
        setTimeout(() => runInAction(() => this.badge = null), 3000);
    }
}

export const achievementPopupStore = new AchievementPopupStore();
export const AchievementPopupContext = createContext(achievementPopupStore);