import { createContext, Dispatch, MutableRefObject, SetStateAction } from "react";

interface GameContextType {
    sec: MutableRefObject<number>;
    inCorrectAnimActive: boolean;
    comboActive: boolean;
    comboTrigger: boolean;
    setInCorrectAnimActive: Dispatch<SetStateAction<boolean>>;
    setComboTrigger: Dispatch<SetStateAction<boolean>>;
    setComboActive: Dispatch<SetStateAction<boolean>>;
}

export const GameContext = createContext<GameContextType>({
    sec: { current: 0 },
    inCorrectAnimActive: false,
    comboActive: false,
    comboTrigger: false,
    setInCorrectAnimActive: () => {},
    setComboTrigger: () => {},
    setComboActive: () => {},
});
