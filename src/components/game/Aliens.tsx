import { memo, useContext, useEffect } from "react";
import { AlienMovePositionType, ProblemType, WordType } from "../../types/resourcesType";
import { destroyProblemIdx } from "../../util";
import { Alien } from "./Alien";
import { GameContext } from "../../context/GameContext";
import { ResourceContext } from "../../context/ResourceContext";

export const Aliens = memo(({ problems }: { problems: { item: WordType; aliens: ProblemType[] } }) => {
    const { comboActive, comboDestroyNum, alienRemoveNum, setAlienRemoveNum } = useContext(GameContext);
    const { aliensPosition } = useContext(ResourceContext);

    const chooseDestroyIdx = () => {
        if (!comboActive && !isNaN(alienRemoveNum)) {
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
            {aliensPosition?.map((data: AlienMovePositionType, idx: number) => {
                if (alienRemoveNum === idx) return null;

                return <Alien key={`alien-${idx}-${problems.item.word_en}`} idx={idx} position={data} problem={problems.aliens[idx]} />;
            })}
        </>
    );
});
