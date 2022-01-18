import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class ForceUpdateStore {
    public toggle = false;

    constructor() {
        makeAutoObservable(this);
    }

    public rerender = () => this.toggle = !this.toggle;
}

export const forceUpdateStore = new ForceUpdateStore();
export const ForceUpdateContext = createContext(forceUpdateStore);