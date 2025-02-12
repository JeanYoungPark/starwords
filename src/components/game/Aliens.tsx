import { memo, useContext, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { AlienMovePositionType } from "../../types/resourcesType";
import { alienPositionState } from "../../store/gameStore";
import { destroyProblemIdx } from "../../util";
import { Alien } from "./Alien";
import { GameContext } from "../../context/GameContext";
import { ResourceContext } from "../../context/ResourceContext";

export const Aliens = memo(() => {
    const { problems } = useContext(ResourceContext);
    const { comboActive, comboDestroyNum, alienRemoveNum, setAlienRemoveNum } = useContext(GameContext);
    const aliensMovePosition = useRecoilValue(alienPositionState);

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

                return <Alien key={`alien-${idx}-${problems.item.word_en}`} idx={idx} position={data} problem={problems.aliens[idx]} />;
            })}
        </>
    );
});
