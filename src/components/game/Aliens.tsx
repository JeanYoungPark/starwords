import { memo, useContext, useEffect } from "react";
import { AlienMovePositionType, ProblemType, WordType } from "../../types/resourcesType";
import { destroyProblemIdx } from "../../util";
import { Alien } from "./Alien";
import { GameContext } from "../../context/GameContext";
import { ResourceContext } from "../../context/ResourceContext";
import { MOVE_IN_TIME } from "../../constants/gameConstants";
import { useSetRecoilState } from "recoil";
import { animActiveState } from "../../store/gameStore";

export const Aliens = memo(({ problems }: { problems: { item: WordType; aliens: ProblemType[] } }) => {
    const { comboActive, comboDestroyNum, alienRemoveNum, setAlienRemoveNum } = useContext(GameContext);
    const { aliensPosition } = useContext(ResourceContext);
    const setAnimActive = useSetRecoilState(animActiveState);

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

        // 외계인 movein 애니메이션 시작
        setAnimActive(true);
        setTimeout(() => {
            // 외계인 movein 애니메이션 종료
            setAnimActive(false)
        }, MOVE_IN_TIME*1000 - 1000)

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
