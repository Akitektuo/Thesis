import { InputNumber } from ".";

export interface PlainBadgeType {
    id?: string;
    name: string;
    image: string;
    points: number;
}

export interface InputPlainBadgeType {
    id?: string;
    name: string;
    image: string;
    points: InputNumber;
}

export interface DisplayBadgeType {
    name: string;
    image: string;
    points: number;
    unlocked: boolean;
}

export interface BadgeType extends DisplayBadgeType {
    id: string;
}

export const EMPTY_INPUT_PLAIN_BADGE: InputPlainBadgeType = {
    name: "",
    image: "",
    points: null
};

export const toPlainBadge = (from: InputPlainBadgeType): PlainBadgeType => ({
    ...from,
    points: from.points ?? 0
});