import { useContext, useEffect } from "react";
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

export const Aliens = ({ problems }: AliensProps) => {
    const { comboActive, comboDestroyNum, setComboDestroyNum } = useContext(GameContext);
    const aliensMovePosition = useRecoilValue(alienPositionState);

    const chooseDestroyIdx = () => {
        if (comboActive && !comboDestroyNum) {
            const originalIndex = destroyProblemIdx(problems.aliens);
            setComboDestroyNum(originalIndex);
        }
    };

    useEffect(() => {
        chooseDestroyIdx();
    }, [problems]);

    return (
        <>
            {aliensMovePosition?.map((data: AlienMovePositionType, idx: number) => {
                if (!comboDestroyNum && comboDestroyNum === idx) return null;

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
};
