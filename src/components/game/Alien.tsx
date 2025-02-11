import { Container, PixiRef, Sprite } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
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

    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const alienRef = useRef<PixiRef<typeof Container> | null>(null);
    const spriteRef = useRef<PixiRef<typeof Sprite> | null>(null);
    const { setupAnimation } = useAlienAnimation({ containerRef, alienRef, spriteRef, position });

    useEffect(() => {
        setupAnimation();
    }, []);

    return (
        <Container ref={containerRef} position={[position.x, position.y]} anchor={0.5}>
            <AlienContainer alienRef={alienRef} spriteRef={spriteRef} idx={idx} problem={problem} setCorrectAnimActive={setCorrectAnimActive} />
            <AlienDestroyAnim idx={idx} correctAnimActive={correctAnimActive} setCorrectAnimActive={setCorrectAnimActive} />
        </Container>
    );
};
