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
import { GameContext } from "../../context/GameContex";

interface AlienProps {
    idx: number;
    problem: ProblemType;
    position: { x: number; y: number };
}

export const Alien = ({ idx, position, problem }: AlienProps) => {
    const { resources, sounds, createProblem, gameData, contentsData } = useContext(ResourceContext);
    const { sec, comboActive, setInCorrectAnimActive } = useContext(GameContext);
    const [comboCnt, setComboCnt] = useRecoilState(comboCntState);
    const [, setScore] = useRecoilState(scoreState);
    const [, setComboScore] = useRecoilState(comboScoreState);
    const [, setAnswer] = useRecoilState(answerCntState);
    const [comboDestroyNum, setComboDestroyNum] = useRecoilState(comboDestroyNumberState);
    const [, setForceAlienRemove] = useRecoilState(forceAlienRemoveState);

    const [correctAnimActive, setCorrectAnimActive] = useState<boolean>(false);
    const [destroyAnimActive, setDestroyAnimActive] = useState<boolean>(false);

    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const spriteRef = useRef<PixiRef<typeof Sprite> | null>(null);
    const alienRef = useRef<PixiRef<typeof Container> | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const destroyFrames = useMemo(
        () => ({
            firstCombo: Array.from({ length: 13 }, (_, i) => resources[`comboDestroy${getFrameNumber(i + 1)}`]),
            correct: Array.from({ length: 10 }, (_, i) => resources[`destroy${getFrameNumber(i + 1)}`]),
        }),
        [resources]
    );

    const randomIdx = useMemo(() => {
        return Math.floor(Math.random() * 5) + 1;
    }, [problem]);

    const handleCompleteCorrectAnim = () => {
        setCorrectAnimActive(false);
        createProblem(gameData, contentsData);

        if (!comboActive) {
            setComboDestroyNum(null);
        }
    };

    const handleOnClickCorrect = () => {
        const alien = alienRef.current;
        const sprite = spriteRef.current as PIXISprite;

        if (!alien || !sprite) return;

        setCorrectAnimActive(true);
        setAnswer((prev) => ({ correct: prev.correct + 1, incorrect: prev.incorrect }));
        sounds["gameCorrect"].play();

        alien.destroy();
        gsap.killTweensOf(sprite);
        spriteRef.current = null;

        if (comboCnt < MAX_COMBO_NUMBER) {
            // 정답일 경우 combo 증가 (5 이하인 경우에)
            if (comboActive) {
                setComboScore((prev) => (prev += 100));
            }

            setScore((prev) => (prev += 100));
            setComboCnt((prev) => (prev += 1));
        }
    };

    const handleOnClickIncorrect = () => {
        setInCorrectAnimActive(true);
        sounds["gameIncorrect"].play();

        setAnswer((prev) => ({ correct: prev.correct, incorrect: prev.incorrect + 1 }));

        // if (!comboActive) {
        //     setComboDestroyNum(null);
        // }
    };

    const checkAnswer = () => {
        if (problem.correct === "Y") {
            handleOnClickCorrect();
        } else {
            handleOnClickIncorrect();
        }

        sec.current = 0;

        if (timelineRef.current) {
            timelineRef.current.kill();
            timelineRef.current = null;
        }
    };

    useLayoutEffect(() => {
        const container = containerRef.current as PIXIContainer;
        const sprite = spriteRef.current as PIXISprite;

        if (container && sprite) {
            gsap.fromTo(container, { x: 200, y: 150 }, { x: position.x, y: position.y, duration: 0.5, ease: "sign" });

            timelineRef.current = gsap
                .timeline({ repeat: -1 })
                .to(sprite, {
                    x: 10,
                    rotation: 0.03,
                    duration: 1.5,
                    ease: "power1.inOut",
                })
                .to(sprite, {
                    x: -10,
                    rotation: -0.03,
                    duration: 3,
                    ease: "power1.inOut",
                })
                .to(sprite, {
                    x: 0,
                    rotation: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                });

            gsap.to(sprite.scale, {
                x: 0.9,
                y: 0.9,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "none",
            });
        }

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
                timelineRef.current = null;
            }
            gsap.killTweensOf(container);
            gsap.killTweensOf(sprite);
        };
    }, []);

    useEffect(() => {
        if (comboDestroyNum && comboDestroyNum === idx) {
            const alien = alienRef.current;
            const sprite = spriteRef.current as PIXISprite;

            if (alien && sprite) {
                sounds["alienDestroy"].play();
                setDestroyAnimActive(true);
                setComboDestroyNum(null);

                gsap.killTweensOf(sprite);
                alien.destroy();
                spriteRef.current = null;
            }
        }
    }, [comboDestroyNum, idx]);

    return (
        <Container ref={containerRef} position={[position.x, position.y]} anchor={0.5} interactive={true} pointerdown={checkAnswer}>
            <Container ref={alienRef}>
                <Sprite ref={spriteRef} texture={resources[`alien0${randomIdx}`]} anchor={0.5} name={`alien0${idx + 1}`} />
                <Text
                    name={`alienText0${idx + 1}`}
                    text={problem.word}
                    position={[0, 100]}
                    style={
                        new TextStyle({
                            fontFamily: "NotoSans",
                            fontSize: 40,
                            fill: "rgba(256, 256, 256)",
                            fontWeight: "700",
                        })
                    }
                    anchor={0.5}
                />
            </Container>
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
                    onComplete={() => {
                        setDestroyAnimActive(false);
                        setForceAlienRemove(false);
                    }}
                />
            )}
        </Container>
    );
};
