import { atom } from "recoil";
import { AlienMovePositionType } from "../types/resourcesType";

export const alienPositionState = atom<AlienMovePositionType[] | null>({
    key: "alienPosition",
    default: null,
});

export const comboCntState = atom<number>({
    key: "comboCntState",
    default: 0,
});

export const isComboState = atom<boolean>({
    key: "isComboActiveState",
    default: false,
});

export const scoreState = atom<number>({
    key: "scoreState",
    default: 0,
});
