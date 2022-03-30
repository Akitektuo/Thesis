import { createBadge, updateBadge } from "accessor/badge-accessor";
import { loadingService, toastService } from "infrastructure";
import { makeAutoObservable, toJS } from "mobx";
import { createContext } from "react";
import { InputNumber } from "shared/types";
import {
    EMPTY_INPUT_PLAIN_BADGE,
    InputPlainBadgeType,
    PlainBadgeType,
    toPlainBadge
} from "shared/types/badge-types";
import { makeValidator, Validator } from "validation";
import BadgeFormDialogRules from "./badge-form-dialog-rules";

export class BadgeFormDialogStore {
    public badgeEdit: InputPlainBadgeType = EMPTY_INPUT_PLAIN_BADGE;
    public shouldShow: boolean = false;
    public isAdd: boolean = true;

    public validator: Validator<InputPlainBadgeType>;

    constructor() {
        makeAutoObservable(this);
        this.validator = makeValidator(this.badgeEdit, BadgeFormDialogRules);
    }

    public setBadge = (badge: PlainBadgeType | null | undefined) => {
        if (badge === undefined)
            return this.shouldShow = false;

        this.setBadgeEdit(badge ?? EMPTY_INPUT_PLAIN_BADGE);
        this.isAdd = badge === null;
        this.shouldShow = true;
    }

    private setBadgeEdit = (fromBadge: InputPlainBadgeType) => {
        this.badgeEdit = toJS(fromBadge);
        this.validator = makeValidator(this.badgeEdit, BadgeFormDialogRules);
    }

    public setName = (name: string) => this.badgeEdit.name = name;

    public setImage = (image: string) => this.badgeEdit.image = image;

    public setPoints = (points: InputNumber) => this.badgeEdit.points = points;

    public handleSave = async () => {
        this.validator.validate();
        if (!this.validator.isValid())
            return;

        loadingService.setLoading(true);
        const apiCall = this.isAdd ? createBadge : updateBadge;

        try {
            const result = await apiCall(toPlainBadge(this.badgeEdit));

            const actionName = this.isAdd ? "created" : "updated";
            toastService.showSuccess(`Badge '${this.badgeEdit.name}' ${actionName} successfully!`);
            loadingService.setLoading(false);
            
            return result;
        } catch (error: any) {
            toastService.showError(error);
            loadingService.setLoading(false);
        }
    }
}

export const badgeFormDialogStore = new BadgeFormDialogStore();
export const BadgeFormDialogContext = createContext(badgeFormDialogStore);