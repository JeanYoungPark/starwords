import { AnimatedSprite } from "@pixi/react";
import React, { useContext } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { GameContext } from "../../context/GameContex";

export const InCorrectAnim = () => {
    const { resources, gameData, contentsData, createProblem } = useContext(ResourceContext);
    const { setInCorrectAnimActive } = useContext(GameContext);

    const INCORRECT_FRAMES = Array.from({ length: 8 }, (_, i) => resources[`incorrect0${i + 1}`]);

    const handleCompleteIncorrectAnim = () => {
        setInCorrectAnimActive(false);
        createProblem(gameData, contentsData);
    };

    return (
        <AnimatedSprite
            textures={INCORRECT_FRAMES}
            anchor={0.5}
            isPlaying={true}
            animationSpeed={0.2}
            loop={false}
            scale={1.5}
            position={[0, 0]}
            onComplete={handleCompleteIncorrectAnim}
        />
    );
};
