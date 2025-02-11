import { AnimatedSprite, Sprite } from "@pixi/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { getFrameNumber } from "../../util";
import { GameContext } from "../../context/GameContext";

interface AlienDestroyAnimProps {
    idx: number;
    correctAnimActive: boolean;
    setCorrectAnimActive: (val: boolean) => void;
}

export const AlienDestroyAnim = ({ idx, correctAnimActive, setCorrectAnimActive }: AlienDestroyAnimProps) => {
    const { resources, createProblem, gameData, contentsData } = useContext(ResourceContext);
    const { comboCnt, comboDestroyNum, setComboDestroyNum, setAnimActive } = useContext(GameContext);
    const [destroyAnimActive, setDestroyAnimActive] = useState<boolean>(false);

    const destroyFrames = useMemo(
        () => ({
            firstCombo: Array.from({ length: 10 }, (_, i) => resources[`comboDestroy${getFrameNumber(i + 1)}`]),
            correct: Array.from({ length: 13 }, (_, i) => resources[`destroy${getFrameNumber(i + 1)}`]),
        }),
        [resources]
    );

    const handleCompleteCorrectAnim = () => {
        setCorrectAnimActive(false);
        setAnimActive(false);
        createProblem(gameData, contentsData);
    };

    const handleCompleteDestroyAnim = () => {
        setDestroyAnimActive(false);
        setAnimActive(false);
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
