import { atom } from "recoil";
import { Actions } from "../types/actionsType";

export const actionState = atom<Actions>({
    key: "actionState",
    default: Actions.INIT,
});
