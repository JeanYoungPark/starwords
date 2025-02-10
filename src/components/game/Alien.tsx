import { AnimatedSprite, Container, PixiRef, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ProblemType } from "../../types/resourcesType";
import { TextStyle, Container as PIXIContainer, Sprite as PIXISprite } from "pixi.js";
import { ResourceContext } from "../../context/ResourceContext";
import gsap from "gsap";
import { useRecoilState } from "recoil";
import { answerCntState, comboCntState, comboDestroyNumberState, comboScoreState, forceAlienRemoveState, scoreState } from "../../store/gameStore";
import { MAX_COMBO_NUMBER } from "../../constants/commonConstants";
import { getFrameNumber } from "../../util";
import { GameContext } from "../../context/GameContext";
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
