import { AnimatedSprite, Sprite } from "@pixi/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { getFrameNumber } from "../../util";
import { GameContext } from "../../context/GameContext";
import { useSetRecoilState } from "recoil";
import { AlienActionState } from "../../store/assetsStore";
import { AlienActions } from "../../types/actionsType";
import { animActiveState } from "../../store/gameStore";

interface AlienDestroyAnimProps {
    idx: number;
    correctAnimActive: boolean;
    setCorrectAnimActive: (val: boolean) => void;
}

export const AlienDestroyAnim = ({ idx, correctAnimActive, setCorrectAnimActive }: AlienDestroyAnimProps) => {
    const { resources } = useContext(ResourceContext);
    const { comboCnt, comboDestroyNum, setComboDestroyNum } = useContext(GameContext);
    const setAlienAction = useSetRecoilState(AlienActionState);
    const setAnimActive = useSetRecoilState(animActiveState);
    const [destroyAnimActive, setDestroyAnimActive] = useState<boolean>(false);

    const destroyFrames = useMemo(
        () => ({
            firstCombo: Array.from({ length: 10 }, (_, i) => resources[`comboDestroy${getFrameNumber(i + 1)}`]),
            correct: Array.from({ length: 13 }, (_, i) => resources[`destroy${getFrameNumber(i + 1)}`]),
        }),
        [resources]
    );

    // 정답 애니메이션 완료
    const handleCompleteCorrectAnim = () => {
        setCorrectAnimActive(false);
        setAnimActive(false)
        setAlienAction(AlienActions.NEXT);
    };

    // 오답 애니메이션 완료
    const handleCompleteDestroyAnim = () => {
        setDestroyAnimActive(false);
        setAnimActive(false)
        setComboDestroyNum(NaN);
    };

    useEffect(() => {
        if (comboDestroyNum === idx) {
            setDestroyAnimActive(true);
        }
    }, [comboDestroyNum, idx]);

    return (
        <>
            {correctAnimActive && (
                <>
                    <AnimatedSprite
                        textures={destroyFrames.correct}
                        anchor={0.5}
                        isPlaying={true}
                        animationSpeed={0.3}
                        loop={false}
                        position={[0, 0]}
                        onComplete={handleCompleteCorrectAnim}
                    />
                    <Sprite texture={resources[`combo0${comboCnt}`]} anchor={0.5} position={[0, -80]} />
                </>
            )}
            {destroyAnimActive && (
                <AnimatedSprite
                    textures={destroyFrames.firstCombo}
                    anchor={0.5}
                    isPlaying={true}
                    animationSpeed={0.3}
                    loop={false}
                    position={[0, 0]}
                    onComplete={handleCompleteDestroyAnim}
                />
            )}
        </>
    );
};
