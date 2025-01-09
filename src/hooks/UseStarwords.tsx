import React, { useState } from "react";
import { AlienMovePositionType, ProblemType, WordType } from "../types/resourcesType";

export const UseStarwords = () => {
    const [leftTime, setLeftTime] = useState(0);
    const [idx, setIdx] = useState(-1);
    const [problem, setProblem] = useState<
        | {
              item: WordType;
              aliens: ProblemType[];
          }
        | undefined
    >(undefined);

    const setContentInfo = () => {};

    const contentDataParse = (data: any) => {
        if (data.level_code >= "LV06") {
            return [
                { x: -453, y: -75, direction_x: "left", direction_y: "top" },
                { x: 0, y: -75, direction_x: "center", direction_y: "top" },
                { x: 453, y: -75, direction_x: "right", direction_y: "top" },
                { x: -268, y: 214, direction_x: "left", direction_y: "bottom" },
                { x: 268, y: 214, direction_x: "right", direction_y: "bottom" },
            ];
        } else {
            return [
                { x: -268, y: -75, direction_x: "left", direction_y: "top" },
                { x: 268, y: -75, direction_x: "right", direction_y: "top" },
                { x: -268, y: 214, direction_x: "left", direction_y: "bottom" },
                { x: 268, y: 214, direction_x: "right", direction_y: "bottom" },
            ];
        }
    };

    const gameDataParse = (data: any) => {
        setLeftTime(data.time_limit + 1);
        setIdx(-1);
        return shuffleWord(data.word_arr);
    };

    const shuffleWord = (data: WordType[]) => {
        if (data.length > 0) {
            for (var i = data.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }

            return data;
        }
    };

    const createProblem = (gameData: any, contentData: any) => {
        const nextIdx = idx + 1;
        setIdx(nextIdx);

        if (nextIdx >= gameData.length) {
            setIdx(0);
        }

        const alienCnt = contentData.level_code >= "LV06" ? 5 : 4;
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

                i++;
            }
        }

        // 정답
        const correctRand = Math.floor(Math.random() * aliens.length);
        aliens[correctRand] = {
            word: gameData.word_arr[nextIdx].word_en,
            correct: "Y",
        };

        setProblem({
            item: gameData.word_arr[nextIdx],
            aliens: aliens,
        });
    };

    return { contentDataParse, gameDataParse, createProblem, problem };
};
