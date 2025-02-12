import { AnimatedSprite } from "@pixi/react";
import React, { useContext } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { GameContext } from "../../context/GameContext";
import { useSetRecoilState } from "recoil";
import { AlienActionState } from "../../store/assetsStore";
import { AlienActions } from "../../types/actionsType";

export const InCorrectAnim = () => {
    const { resources } = useContext(ResourceContext);
    const { setInCorrectAnimActive, setAnimActive } = useContext(GameContext);
    const setAlienAction = useSetRecoilState(AlienActionState);

    const INCORRECT_FRAMES = Array.from({ length: 8 }, (_, i) => resources[`incorrect0${i + 1}`]);

    const handleCompleteIncorrectAnim = () => {
        setInCorrectAnimActive(false);
        setAnimActive(false);
        setAlienAction(AlienActions.NEXT);
        // createProblem(gameData, contentsData);
    };

    return (
        <AnimatedSprite
            textures={INCORRECT_FRAMES}
            anchor={0.5}
            isPlaying={true}
            animationSpeed={0.2}
            loop={false}
            position={[0, 0]}
            onComplete={handleCompleteIncorrectAnim}
        />
    );
};
