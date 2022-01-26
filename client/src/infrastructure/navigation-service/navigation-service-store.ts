import { createContext } from "react";
import { NavigateFunction } from "react-router";

export class NavigationServiceStore {
    public to: NavigateFunction = () => {};

    public initialize = (navigateFunction: NavigateFunction) => this.to = navigateFunction;
}

export const navigationServiceStore = new NavigationServiceStore();
export const NavigationServiceContext = createContext(navigationServiceStore);