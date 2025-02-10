import { createContext, Dispatch, MutableRefObject, SetStateAction } from "react";

interface GameContextType {
    sec: MutableRefObject<number>;
    inCorrectAnimActive: boolean;
    comboActive: boolean;
    comboDestroyNum: number;
    comboCnt: number;
    setInCorrectAnimActive: Dispatch<SetStateAction<boolean>>;
    setComboDestroyNum: Dispatch<SetStateAction<number>>;
    setComboActive: Dispatch<SetStateAction<boolean>>;
    setComboCnt: Dispatch<SetStateAction<number>>;
}

export const GameContext = createContext<GameContextType>({
    sec: { current: 0 },
    inCorrectAnimActive: false,
    comboActive: false,
    comboDestroyNum: NaN,
    comboCnt: 0,
    setInCorrectAnimActive: () => {},
    setComboDestroyNum: () => {},
    setComboActive: () => {},
    setComboCnt: () => {},
});
