import { atom } from "recoil";

export const comboState = atom<number>({
    key: "comboState",
    default: 0,
});
