import { ReactNode, useRef, useState } from "react";
import { GameContext } from "./GameContex";

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [inCorrectAnimActive, setInCorrectAnimActive] = useState<boolean>(false);
    const [comboActive, setComboActive] = useState<boolean>(false);
    const [comboTrigger, setComboTrigger] = useState<boolean>(false);
    const sec = useRef<number>(0);

    const init = () => {
        setComboActive(false);
    };

    return (
        <GameContext.Provider
            value={{ sec, inCorrectAnimActive, comboActive, comboTrigger, setInCorrectAnimActive, setComboActive, setComboTrigger }}>
            {children}
        </GameContext.Provider>
    );
};
