import { ReactNode, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { GameContext } from "./GameContext";
import { animActiveState, answerCntState, problemIdxState } from "../store/gameStore";
import { actionState, AlienActionState, gameActionState } from "../store/assetsStore";
import { Actions, AlienActions, GameActions } from "../types/actionsType";
import { ProblemType, WordType } from "../types/resourcesType";

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const setActions = useSetRecoilState(actionState);
    const setGameAction = useSetRecoilState(gameActionState);
    const setAlienAction = useSetRecoilState(AlienActionState);
    const setAnswerCnt = useSetRecoilState(answerCntState);
    const setAnimActive = useSetRecoilState(animActiveState);

    const [problemIdx, setProblemIdx] = useRecoilState(problemIdxState);
    const [inCorrectAnimActive, setInCorrectAnimActive] = useState<boolean>(false);
    const [comboCnt, setComboCnt] = useState<number>(0);
    const [comboActive, setComboActive] = useState<boolean>(false);
    const [comboDestroyNum, setComboDestroyNum] = useState<number>(NaN);
    const sec = useRef<number>(0);

    const [problems, setProblems] = useState<
        | {
              item: WordType;
              aliens: ProblemType[];
          }
        | undefined
    >(undefined);

    const init = () => {
        setActions(Actions.GAME_PLAY);
        setGameAction(GameActions.STAND_BY);
        setAlienAction(AlienActions.STAND_BY);
        setAnswerCnt({
            correct: 0,
            incorrect: 0,
            combo: 0,
        });

        setInCorrectAnimActive(false);
        setComboActive(false);
        setComboCnt(0);
        setComboDestroyNum(NaN);
        setAnimActive(false);
        sec.current = 0;
    };

    const createProblem = (gameData: any, contentsData: any) => {
        //combo 상태일때는 문제 3개만 노출
        let nextIdx = problemIdx + 1;
        if (nextIdx >= gameData.word_arr.length) {
            nextIdx = 0;
        }

        setProblemIdx(nextIdx);

        const alienCnt = contentsData.level_code >= "LV06" ? 5 : 4;

        let aliens: ProblemType[] = [];
        let i = 0;
        let breakCnt = 0;

        // 오답 만들기
        while (aliens.length < alienCnt) {
            // 무한루프 방지
            breakCnt++;
            if (breakCnt > 50) break;

            // 오답 리스트중 한개 랜덤으로 선택
            let rand_word = gameData.wrong_word_arr[Math.floor(Math.random() * gameData.wrong_word_arr.length)].word_en;

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

                while (true) {
                    if (
                        aliens.find(function (ele) {
                            return ele.word === gameData.word_arr[nextIdx].word_en;
                        })
                    ) {
                        delete aliens[i];

                        aliens[i] = {
                            word: gameData.wrong_word_arr[Math.floor(Math.random() * gameData.wrong_word_arr.length)].word_en,
                            correct: "N",
                        };
                    }

                    if (
                        aliens.find(function (ele) {
                            return ele.word !== gameData.word_arr[nextIdx].word_en;
                        })
                    ) {
                        break;
                    }
                }

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
                createProblem,
                setInCorrectAnimActive,
                setComboActive,
                setComboDestroyNum,
                setComboCnt,
                init,
            }}>
            {children}
        </GameContext.Provider>
    );
};
