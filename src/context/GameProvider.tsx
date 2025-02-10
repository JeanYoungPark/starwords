import { ReactNode, useRef, useState } from "react";
import { GameContext } from "./GameContext";

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [inCorrectAnimActive, setInCorrectAnimActive] = useState<boolean>(false);
    const [comboActive, setComboActive] = useState<boolean>(false);
    const [comboDestroyNum, setComboDestroyNum] = useState<number>(NaN);
    const [comboCnt, setComboCnt] = useState<number>(0);
    const sec = useRef<number>(0);

    const init = () => {
        setComboActive(false);
    };

    return (
        <GameContext.Provider
            value={{
                sec,
                inCorrectAnimActive,
                comboActive,
                comboDestroyNum,
                comboCnt,
                setInCorrectAnimActive,
                setComboActive,
                setComboDestroyNum,
                setComboCnt,
            }}>
            {children}
        </GameContext.Provider>
    );
};
