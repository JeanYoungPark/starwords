import { AnimatedSprite, Sprite } from "@pixi/react";
import { useContext, useMemo } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { getFrameNumber } from "../../util";
import { GameContext } from "../../context/GameContext";
import { useRecoilState } from "recoil";
import { comboCntState } from "../../store/gameStore";

interface AlienDestroyAnimProps {
    correctAnimActive: boolean;
    destroyAnimActive: boolean;
    setCorrectAnimActive: (val: boolean) => void;
    setDestroyAnimActive: (val: boolean) => void;
}

export const AlienDestroyAnim = ({ correctAnimActive, destroyAnimActive, setCorrectAnimActive, setDestroyAnimActive }: AlienDestroyAnimProps) => {
    const { resources, createProblem, gameData, contentsData } = useContext(ResourceContext);
    const { comboActive, comboCnt, setComboDestroyNum } = useContext(GameContext);

    const destroyFrames = useMemo(
        () => ({
            firstCombo: Array.from({ length: 13 }, (_, i) => resources[`comboDestroy${getFrameNumber(i + 1)}`]),
            correct: Array.from({ length: 10 }, (_, i) => resources[`destroy${getFrameNumber(i + 1)}`]),
        }),
        [resources]
    );

    const handleCompleteCorrectAnim = () => {
        setCorrectAnimActive(false);
        createProblem(gameData, contentsData);
    };

    const handleCompleteDestroyAnim = () => {
        setDestroyAnimActive(false);
        setComboDestroyNum(NaN);
    };

    return (
        <>
            {correctAnimActive && (
                <>
                    <AnimatedSprite
                        textures={destroyFrames.correct}
                        anchor={0.5}
                        isPlaying={true}
                        animationSpeed={0.2}
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
                    animationSpeed={0.2}
                    loop={false}
                    position={[0, 0]}
                    onComplete={handleCompleteDestroyAnim}
                />
            )}
        </>
    );
};
