import { AnimatedSprite, Container, PixiRef, Sprite, Text } from "@pixi/react";
import { MutableRefObject, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AlienMovePositionType, ProblemType, WordType } from "../../types/resourcesType";
import { TextStyle, Container as PIXIContainer, Sprite as PIXISprite } from "pixi.js";
import { ResourceContext } from "../../context/ResourceContext";
import gsap from "gsap";
import { useRecoilState, useRecoilValue } from "recoil";
import { alienPositionState, comboCntState, comboDestroyNumberState, isComboState, scoreState } from "../../store/gameStore";
import { MAX_COMBO_NUMBER } from "../../constants/commonConstants";

type AlienContextType = {
    sec: MutableRefObject<number>;
    handleCorrect: () => void;
    handleIncorrect: () => void;
};

export const Aliens = ({
    problems,
    sec,
    handleCorrect,
    handleIncorrect,
}: {
    problems: {
        item: WordType;
        aliens: ProblemType[];
    };
} & AlienContextType) => {
    const [aliensMovePosition, setAliensMovePosition] = useRecoilState(alienPositionState);
    const isCombo = useRecoilValue(isComboState);
    const [comboRemoveIdx, setComboRemoveIdx] = useState<number | null>(null);

    // useEffect(() => {
    //     if (isCombo && problem) {
    //         console.log("!!");
    //         const originalIndex = destroyProblemIdx(problem.aliens);
    //         setComboRemoveIdx(originalIndex);
    //     }
    // }, [isCombo, problem]);

    return (
        <>
            {aliensMovePosition?.map((data: AlienMovePositionType, idx: number) => {
                if (comboRemoveIdx === idx) return null;

                return (
                    <Alien
                        key={`alien-${idx}-${problems.item.word_en}`}
                        idx={idx}
                        sec={sec}
                        position={{ x: data.x, y: data.y }}
                        problem={problems.aliens[idx]}
                        handleCorrect={handleCorrect}
                        handleIncorrect={handleIncorrect}
                    />
                );
            })}
        </>
    );
};

const Alien = ({
    idx,
    position,
    sec,
    problem,
    handleCorrect,
    handleIncorrect,
}: {
    problem: ProblemType;
    idx: number;
    position: { x: number; y: number };
} & AlienContextType) => {
    const { resources, sounds } = useContext(ResourceContext);
    const [comboCnt, setComboCnt] = useRecoilState(comboCntState);
    const [, setScore] = useRecoilState(scoreState);
    const isCombo = useRecoilValue(isComboState);
    const [comboDestroyNum, setComboDestroyNum] = useRecoilState(comboDestroyNumberState);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isDestroy, setIsDestroy] = useState<boolean>(false);
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const spriteRef = useRef<PixiRef<typeof Sprite> | null>(null);
    const alienRef = useRef<PixiRef<typeof Container> | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const destroy = [
        resources.destroy01,
        resources.destroy02,
        resources.destroy03,
        resources.destroy04,
        resources.destroy05,
        resources.destroy06,
        resources.destroy07,
        resources.destroy08,
        resources.destroy09,
        resources.destroy10,
        resources.destroy11,
        resources.destroy12,
        resources.destroy13,
    ];

    const comboDestroy = [
        resources.comboDestroy01,
        resources.comboDestroy02,
        resources.comboDestroy03,
        resources.comboDestroy04,
        resources.comboDestroy05,
        resources.comboDestroy06,
        resources.comboDestroy07,
        resources.comboDestroy08,
        resources.comboDestroy09,
        resources.comboDestroy10,
    ];

    const randomIdx = useMemo(() => {
        return Math.floor(Math.random() * 5) + 1;
    }, [problem]);

    const checkAnswer = () => {
        if (problem.correct === "Y") {
            const sprite = spriteRef.current as PIXISprite;

            if (sprite) {
                sounds["gameCorrect"].play();
                sprite.destroy();
                spriteRef.current = null;
                setIsCorrect(true);
                if (comboCnt < MAX_COMBO_NUMBER) {
                    // 정답일 경우 combo 증가 (5 이하인 경우에)
                    const score = isCombo ? 200 : 100;
                    setScore((prev) => (prev += score));
                    setComboCnt((prev) => (prev += 1));
                }
            }
        } else {
            handleIncorrect();
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
                // sounds["gameCorrect"].play();
                setIsDestroy(true);
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
            {isCorrect && (
                <>
                    <AnimatedSprite
                        textures={destroy}
                        anchor={0.5}
                        isPlaying={true}
                        animationSpeed={0.2}
                        loop={false}
                        position={[0, 0]}
                        onComplete={() => {
                            setIsCorrect(false);
                            handleCorrect();
                        }}
                    />
                    <Sprite texture={resources[`combo0${comboCnt}`]} anchor={0.5} position={[0, -80]} />
                </>
            )}
            {isDestroy && (
                <AnimatedSprite
                    textures={comboDestroy}
                    anchor={0.5}
                    isPlaying={true}
                    animationSpeed={0.2}
                    loop={false}
                    position={[0, 0]}
                    onComplete={() => setIsDestroy(false)}
                />
            )}
        </Container>
    );
};
