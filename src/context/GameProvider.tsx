import { ReactNode, useRef, useState } from "react";
import { GameContext } from "./GameContext";
import { useSetRecoilState } from "recoil";
import { answerCntState, comboScoreState, scoreState } from "../store/gameStore";
import { AlienActionState, gameActionState } from "../store/assetsStore";
import { AlienActions, GameActions } from "../types/actionsType";

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const setGameAction = useSetRecoilState(gameActionState);
    const setAlienAction = useSetRecoilState(AlienActionState);
    const setScore = useSetRecoilState(scoreState);
    const setComboScore = useSetRecoilState(comboScoreState);
    const setAnswerCnt = useSetRecoilState(answerCntState);

    const [inCorrectAnimActive, setInCorrectAnimActive] = useState<boolean>(false);
    const [comboCnt, setComboCnt] = useState<number>(0);
    const [comboActive, setComboActive] = useState<boolean>(false);
    const [comboDestroyNum, setComboDestroyNum] = useState<number>(NaN);
    const [alienRemoveNum, setAlienRemoveNum] = useState<number>(NaN);
    const [animActive, setAnimActive] = useState<boolean>(false);
    const sec = useRef<number>(0);

    const init = () => {
        setGameAction(GameActions.STAND_BY);
        setAlienAction(AlienActions.STAND_BY);

        setScore(0);
        setComboScore(0);
        setAnswerCnt({
            correct: 0,
            incorrect: 0,
        });

        setInCorrectAnimActive(false);
        setComboActive(false);
        setComboCnt(0);
        setComboDestroyNum(NaN);
        setAlienRemoveNum(NaN);
        setAnimActive(false);
        sec.current = 0;
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
                init,
            }}>
            {children}
        </GameContext.Provider>
    );
};
