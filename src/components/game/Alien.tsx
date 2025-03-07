import { Container, PixiRef, Sprite, Text } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import { ProblemType } from "../../types/resourcesType";
import { AlienDestroyAnim } from "./AlienDestroyAnim";
import { AlienContainer } from "./AlienContainer";
import { useAlienAnimation } from "../../hooks/game/useAlienAnimation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AlienActionState } from "../../store/assetsStore";
import { AlienActions } from "../../types/actionsType";
import { animActiveState, isTestState } from "../../store/gameStore";
import { TextStyle } from "pixi.js";

interface AlienProps {
    idx: number;
    problem: ProblemType;
    position: { x: number; y: number; direction_x: string; direction_y: string };
}

export const Alien = ({ idx, position, problem }: AlienProps) => {
    const isTest = useRecoilValue(isTestState);
    const [alienAction, setAlienAction] = useRecoilState(AlienActionState);
    const setAnimActive = useSetRecoilState(animActiveState);
    const [correctAnimActive, setCorrectAnimActive] = useState<boolean>(false);

    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const alienRef = useRef<PixiRef<typeof Container> | null>(null);
    const spriteRef = useRef<PixiRef<typeof Sprite> | null>(null);
    const { setupAnimation, endAnimation, cleanupAnimations } = useAlienAnimation({ containerRef, alienRef, spriteRef, position });

    useEffect(() => {
        const moveInAnim = async () => {
            // 외계인 movein 애니메이션 시작
            await setupAnimation();
            // 외계인 movein 애니메이션 종료
        };

        moveInAnim();
        return () => {
            cleanupAnimations();
        };
    }, []);

    useEffect(() => {
        const moveOutAnim = async () => {
            // 외계인 moveout 애니메이션 시작
            setAnimActive(true);
            await endAnimation();
            // 외계인 moveout 애니메이션 종료
            setAnimActive(false);
            setAlienAction(AlienActions.STAND_BY);
        };

        if (alienAction === AlienActions.NEXT) {
            moveOutAnim();
        }

        return () => {
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
            />
            {isTest && problem.correct === 'Y' && (
                <Text text='정답' position={[-80,-70]} anchor={0.5} style={new TextStyle({
                    fontSize: 30,
                    fill: "rgba(256,256,256)",
                })}/>
            )}
            <AlienDestroyAnim idx={idx} correctAnimActive={correctAnimActive} setCorrectAnimActive={setCorrectAnimActive} />
        </Container>
    );
};
