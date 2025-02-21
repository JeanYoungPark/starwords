import { Container, PixiRef, Sprite } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import { ProblemType } from "../../types/resourcesType";
import { AlienDestroyAnim } from "./AlienDestroyAnim";
import { AlienContainer } from "./AlienContainer";
import { useAlienAnimation } from "../../hooks/game/useAlienAnimation";
import { useRecoilState } from "recoil";
import { AlienActionState } from "../../store/assetsStore";
import { AlienActions } from "../../types/actionsType";

interface AlienProps {
    idx: number;
    problem: ProblemType;
    position: { x: number; y: number; direction_x: string; direction_y: string };
}

export const Alien = ({ idx, position, problem }: AlienProps) => {
    const [alienAction, setAlienAction] = useRecoilState(AlienActionState);
    const [correctAnimActive, setCorrectAnimActive] = useState<boolean>(false);

    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const alienRef = useRef<PixiRef<typeof Container> | null>(null);
    const spriteRef = useRef<PixiRef<typeof Sprite> | null>(null);
    const [alienAnimActive, setAlienAnimActive] = useState<boolean>(false);
    const { setupAnimation, endAnimation, cleanupAnimations } = useAlienAnimation({ containerRef, alienRef, spriteRef, position });

    useEffect(() => {
        const moveInAnim = async () => {
            setAlienAnimActive(true);
            await setupAnimation();
            setAlienAnimActive(false);
        };

        moveInAnim();
        return () => {
            console.log("cleanup 1");
            cleanupAnimations();
        };
    }, []);

    useEffect(() => {
        const moveOutAnim = async () => {
            setAlienAnimActive(true);
            await endAnimation();
            setAlienAction(AlienActions.STAND_BY);
            setAlienAnimActive(false);
        };

        if (alienAction === AlienActions.NEXT) {
            moveOutAnim();
        }

        return () => {
            console.log("cleanup 2");
            cleanupAnimations();
        };
    }, [alienAction]);

    return (
        <Container ref={containerRef} anchor={0.5}>
            <AlienContainer
                alienRef={alienRef}
                spriteRef={spriteRef}
                idx={idx}
                problem={problem}
                setCorrectAnimActive={setCorrectAnimActive}
                alienAnimActive={alienAnimActive}
            />
            <AlienDestroyAnim idx={idx} correctAnimActive={correctAnimActive} setCorrectAnimActive={setCorrectAnimActive} />
        </Container>
    );
};
