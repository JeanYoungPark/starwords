import { Container, PixiRef, Sprite } from "@pixi/react";
import { useRef, useState } from "react";
import { ProblemType } from "../../types/resourcesType";
import { AlienDestroyAnim } from "./AlienDestroyAnim";
import { AlienContainer } from "./AlienContainer";
import { useAlienAnimation } from "../../hooks/game/useAlienAnimation";

interface AlienProps {
    idx: number;
    problem: ProblemType;
    position: { x: number; y: number };
}

export const Alien = ({ idx, position, problem }: AlienProps) => {
    const [correctAnimActive, setCorrectAnimActive] = useState<boolean>(false);
    const [destroyAnimActive, setDestroyAnimActive] = useState<boolean>(false);

    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const alienRef = useRef<PixiRef<typeof Container> | null>(null);
    const spriteRef = useRef<PixiRef<typeof Sprite> | null>(null);

    useAlienAnimation({ containerRef, alienRef, spriteRef, position });

    return (
        <Container ref={containerRef} position={[position.x, position.y]} anchor={0.5}>
            <AlienContainer
                alienRef={alienRef}
                spriteRef={spriteRef}
                idx={idx}
                problem={problem}
                setCorrectAnimActive={setCorrectAnimActive}
                setDestroyAnimActive={setDestroyAnimActive}
            />
            <AlienDestroyAnim
                correctAnimActive={correctAnimActive}
                destroyAnimActive={destroyAnimActive}
                setCorrectAnimActive={setCorrectAnimActive}
                setDestroyAnimActive={setDestroyAnimActive}
            />
        </Container>
    );
};
