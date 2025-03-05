import { useContext } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { incorrectListState, problemIdxState } from "../../store/gameStore";
import { ResourceContext } from "../../context/ResourceContext";

export const useIncorrectList = () => {
    const { gameData } = useContext(ResourceContext);
    const setIncorrectList = useSetRecoilState(incorrectListState);

    const handleIncorrectList = useRecoilCallback(({snapshot}) => async() => {
        const currentProblemIdx = await snapshot.getPromise(problemIdxState);
        const answerData = gameData.word_arr[currentProblemIdx];
        
        setIncorrectList((prev) => {
            const updatedList = prev.map((item) => {
                const key = Object.keys(item)[0];

                if (key === answerData.voca_id) {
                    return {
                        [key]: {
                            ...item[key],
                            cnt: item[key].cnt + 1,
                        },
                    };
                }

                return item;
            });

            // 기존 리스트에 해당 voca_id가 없으면 새로 추가
            if (!prev.some((item) => Object.keys(item)[0] === answerData.voca_id)) {
                updatedList.push({
                    [answerData.voca_id]: {
                        idx: prev.length,
                        cnt: 1,
                        word_ko: answerData.word_ko,
                        word_en: answerData.word_en,
                        sound_url: answerData.sound_url,
                    },
                });
            }

            return updatedList;
        });
    }, []);

    return { handleIncorrectList };
};
