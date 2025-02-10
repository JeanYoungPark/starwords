import { useContext, useEffect } from "react";
import { AlienMovePositionType, ProblemType, WordType } from "../../types/resourcesType";
import { useRecoilState, useRecoilValue } from "recoil";
import { alienPositionState, comboDestroyNumberState, forceAlienRemoveState } from "../../store/gameStore";
import { destroyProblemIdx } from "../../util";
import { Alien } from "./Alien";
import { GameContext } from "../../context/GameContex";

interface AliensProps {
    problems: {
        item: WordType;
        aliens: ProblemType[];
    };
}

export const Aliens = ({ problems }: AliensProps) => {
    const { comboActive } = useContext(GameContext);
    const aliensMovePosition = useRecoilValue(alienPositionState);
    const isForceAlienRemove = useRecoilValue(forceAlienRemoveState);
    const [comboDestroyNum, setComboDestroyNum] = useRecoilState(comboDestroyNumberState);

    const chooseDestroyIdx = () => {
        if (comboActive && !isForceAlienRemove) {
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
                if (!isForceAlienRemove && comboDestroyNum === idx) return null;

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
