import React from "react";
import { useRecoilState } from "recoil";
import { answerCntState, comboCntState, comboDestroyNumberState, comboScoreState, isComboState, scoreState } from "../store/gameStore";

export const UseInit = () => {
    const [, setComboCnt] = useRecoilState(comboCntState);
    const [, setIsCombo] = useRecoilState(isComboState);
    const [, setScore] = useRecoilState(scoreState);
    const [, setComboScore] = useRecoilState(comboScoreState);
    const [, setDestroyNum] = useRecoilState(comboDestroyNumberState);
    const [, setAnswerCnt] = useRecoilState(answerCntState);

    const init = () => {
        setComboCnt(0);
        setIsCombo(false);
        setScore(0);
        setComboScore(0);
        setDestroyNum(null);
        setAnswerCnt({ correct: 0, incorrect: 0 });
    };

    return { init };
};
