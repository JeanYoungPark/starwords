import { AnimatedSprite } from "@pixi/react";
import { useContext } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { GameContext } from "../../context/GameContext";
import { useSetRecoilState } from "recoil";
import { AlienActionState } from "../../store/assetsStore";
import { AlienActions } from "../../types/actionsType";
import { animActiveState } from "../../store/gameStore";

export const InCorrectAnim = () => {
    const { resources } = useContext(ResourceContext);
    const { setInCorrectAnimActive } = useContext(GameContext);
    const setAlienAction = useSetRecoilState(AlienActionState);
    const setAnimActive = useSetRecoilState(animActiveState);

    const INCORRECT_FRAMES = Array.from({ length: 8 }, (_, i) => resources[`incorrect0${i + 1}`]);

    // 오답 애니메이션 완료
    const handleCompleteIncorrectAnim = () => {
        setInCorrectAnimActive(false);
        setAnimActive(false);
        setAlienAction(AlienActions.NEXT);
    };

    return (
        <AnimatedSprite
            textures={INCORRECT_FRAMES}
            anchor={0.5}
            isPlaying={true}
            animationSpeed={0.3}
            loop={false}
            position={[0, 0]}
            onComplete={handleCompleteIncorrectAnim}
        />
    );
};
