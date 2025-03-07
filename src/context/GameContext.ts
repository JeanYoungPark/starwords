import { createContext, Dispatch, MutableRefObject, SetStateAction } from "react";
import { ProblemType, WordType } from "../types/resourcesType";

interface GameContextType {
    problems: { item: WordType; aliens: ProblemType[] } | undefined;
    sec: MutableRefObject<number>;
    inCorrectAnimActive: boolean;
    comboActive: boolean;
    comboDestroyNum: number;
    comboCnt: number;
    createProblem: (gameData: any, contentsData: any) => void;
    setInCorrectAnimActive: Dispatch<SetStateAction<boolean>>;
    setComboDestroyNum: Dispatch<SetStateAction<number>>;
    setComboActive: Dispatch<SetStateAction<boolean>>;
    setComboCnt: Dispatch<SetStateAction<number>>;
    init: () => void;
}

export const GameContext = createContext<GameContextType>({
    problems: undefined,
    sec: { current: 0 },
    inCorrectAnimActive: false,
    comboActive: false,
    comboDestroyNum: NaN,
    comboCnt: 0,
    createProblem: () => {},
    setInCorrectAnimActive: () => {},
    setComboDestroyNum: () => {},
    setComboActive: () => {},
    setComboCnt: () => {},
    init: () => {},
});
