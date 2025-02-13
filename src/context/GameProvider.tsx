import { ReactNode, useRef, useState } from "react";
import { GameContext } from "./GameContext";
import { useRecoilState, useSetRecoilState } from "recoil";
import { answerCntState, comboScoreState, problemIdxState, scoreState } from "../store/gameStore";
import { AlienActionState, gameActionState } from "../store/assetsStore";
import { AlienActions, GameActions } from "../types/actionsType";
import { ProblemType, WordType } from "../types/resourcesType";

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const setGameAction = useSetRecoilState(gameActionState);
    const setAlienAction = useSetRecoilState(AlienActionState);
    const setScore = useSetRecoilState(scoreState);
    const setComboScore = useSetRecoilState(comboScoreState);
    const setAnswerCnt = useSetRecoilState(answerCntState);

    const [problemIdx, setProblemIdx] = useRecoilState(problemIdxState);
    const [inCorrectAnimActive, setInCorrectAnimActive] = useState<boolean>(false);
    const [comboCnt, setComboCnt] = useState<number>(0);
    const [comboActive, setComboActive] = useState<boolean>(false);
    const [comboDestroyNum, setComboDestroyNum] = useState<number>(NaN);
    const [alienRemoveNum, setAlienRemoveNum] = useState<number>(NaN);
    const [animActive, setAnimActive] = useState<boolean>(false);
    const sec = useRef<number>(0);

    const [problems, setProblems] = useState<
        | {
              item: WordType;
              aliens: ProblemType[];
          }
        | undefined
    >(undefined);

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

    const createProblem = (gameData: any, contentsData: any) => {
        //combo 상태일때는 문제 3개만 노출
        const nextIdx = problemIdx + 1;
        setProblemIdx(nextIdx);

        if (nextIdx >= gameData.length) {
            setProblemIdx(0);
        }

        const alienCnt = contentsData.level_code >= "LV06" ? 5 : 4;

        let aliens: ProblemType[] = [];
        let i = 0;
        let breakCnt = 0;
        console.log("==============================");
        // 오답 만들기
        while (aliens.length < alienCnt) {
            // 무한루프 방지
            breakCnt++;
            if (breakCnt > 50) break;

            // 오답 리스트중 한개 랜덤으로 선택
            let rand_word = gameData.wrong_word_arr[Math.floor(Math.random() * gameData.wrong_word_arr.length)].word_en;
            console.log("-----------");
            console.log("aliens:", aliens);
            console.log("gameData.word_arr:", gameData.word_arr);
            console.log("nextIdx: ", nextIdx);
            // 랜덤 오답 단어가 기존 오답과 동일하지 않고 정답 단어와도 동일하지 않은 경우
            if (
                !aliens.find((ele) => {
                    return ele.word === rand_word;
                }) &&
                !aliens.find((ele) => {
                    return ele.word === gameData.word_arr[nextIdx].word_en;
                })
            ) {
                // 오답 리스트에 추가
                aliens[i] = {
                    word: rand_word,
                    correct: "N",
                };

                i++;
            }
        }

        // 정답
        const correctRand = Math.floor(Math.random() * aliens.length);
        aliens[correctRand] = {
            word: gameData.word_arr[nextIdx].word_en,
            correct: "Y",
        };

        setProblems({
            item: gameData.word_arr[nextIdx],
            aliens: aliens,
        });
    };

    return (
        <GameContext.Provider
            value={{
                problems,
                sec,
                inCorrectAnimActive,
                comboActive,
                comboDestroyNum,
                comboCnt,
                animActive,
                alienRemoveNum,
                createProblem,
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
