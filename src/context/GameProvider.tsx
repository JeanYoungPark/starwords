import { ReactNode, useRef, useState } from "react";
import { GameContext } from "./GameContext";

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [inCorrectAnimActive, setInCorrectAnimActive] = useState<boolean>(false);
    const [comboCnt, setComboCnt] = useState<number>(0);
    const [comboActive, setComboActive] = useState<boolean>(false);
    const [comboDestroyNum, setComboDestroyNum] = useState<number>(NaN);
    const [alienRemoveNum, setAlienRemoveNum] = useState<number>(NaN);
    const [animActive, setAnimActive] = useState<boolean>(false);
    const sec = useRef<number>(0);

    const init = () => {
        setComboActive(false);
        setComboCnt(0);
        setComboDestroyNum(NaN);
    };

    return (
        <GameContext.Provider
            value={{
                sec,
                inCorrectAnimActive,
                comboActive,
                comboDestroyNum,
                comboCnt,
                animActive,
                alienRemoveNum,
                setInCorrectAnimActive,
                setComboActive,
                setComboDestroyNum,
                setComboCnt,
                setAnimActive,
                setAlienRemoveNum,
            }}>
            {children}
        </GameContext.Provider>
    );
};
