import { Fragment, memo, useContext, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { AlienMovePositionType, ProblemType, WordType } from "../../types/resourcesType";
import { alienPositionState } from "../../store/gameStore";
import { destroyProblemIdx } from "../../util";
import { Alien } from "./Alien";
import { GameContext } from "../../context/GameContext";

interface AliensProps {
    problems: {
        item: WordType;
        aliens: ProblemType[];
    };
}

export const Aliens = memo(({ problems }: AliensProps) => {
    const { comboActive, comboDestroyNum, alienRemoveNum, setAlienRemoveNum } = useContext(GameContext);
    const aliensMovePosition = useRecoilValue(alienPositionState);
    // const [removeIdx, setRemoveIdx] = useState<number>(NaN);

    const chooseDestroyIdx = () => {
        if (!comboActive && alienRemoveNum) {
            setAlienRemoveNum(NaN);
            return;
        }

        if (comboActive && !comboDestroyNum) {
            const originalIndex = destroyProblemIdx(problems.aliens);
            setAlienRemoveNum(originalIndex);
        }
    };

    useEffect(() => {
        chooseDestroyIdx();
    }, [problems.item.word_en]);

    return (
        <>
            {aliensMovePosition?.map((data: AlienMovePositionType, idx: number) => {
                if (alienRemoveNum === idx) return null;

                return (
                    <Alien
                        key={`alien-${idx}-${problems.item.word_en}`}
                        idx={idx}
                        position={{ x: data.x, y: data.y }}
                        problem={problems.aliens[idx]}
                    />
                );
            })}
        </>
    );
});
