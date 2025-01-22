import { AnimatedSprite, Container, PixiRef, Sprite, Text } from "@pixi/react";
import React, { MutableRefObject, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AlienMovePositionType, ProblemType, WordType } from "../types/resourcesType";
import { TextStyle, Container as PIXIContainer, Sprite as PIXISprite } from "pixi.js";
import { ResourceContext } from "../context/ResourceContext";
import gsap from "gsap";
import { useRecoilState } from "recoil";
import { comboState } from "../store/gameStore";

type AlienContextType = {
    problem: { item: WordType; aliens: ProblemType[] } | undefined;
    sec: MutableRefObject<number>;
    handleCorrect: () => void;
    handleIncorrect: () => void;
};

export const Aliens = ({ problem, sec, handleCorrect, handleIncorrect }: AlienContextType) => {
    const { aliensMovePosition } = useContext(ResourceContext);

    return (
        <>
            {aliensMovePosition?.map((data: AlienMovePositionType, idx: number) => {
                return (
                    <Alien
                        key={`alien-${idx}-${problem?.item.word_en}`}
                        idx={idx}
                        sec={sec}
                        position={{ x: data.x, y: data.y }}
                        problem={problem}
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
    idx: number;
    position: { x: number; y: number };
} & AlienContextType) => {
    const { resources, sounds, gameData, contentsData } = useContext(ResourceContext);
    const [combo, setCombo] = useRecoilState(comboState);
    const [isCorrect, setIsCorrect] = useState(false);
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const spriteRef = useRef<PixiRef<typeof Sprite>>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const randomIdx = useMemo(() => {
        return Math.floor(Math.random() * 5) + 1;
    }, [problem]);

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

    const checkAnswer = () => {
        if (problem?.aliens[idx].correct === "Y") {
            const sprite = spriteRef.current as PIXISprite;

            if (sprite) {
                sounds["gameCorrect"].play();
                sprite.destroy();
                setIsCorrect(true);
                if (combo < 5) {
                    // 정답일 경우 combo 증가 (5 이하인 경우에)
                    setCombo((prev) => (prev += 1));
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

    return (
        <Container ref={containerRef} position={[position.x, position.y]} anchor={0.5} interactive={true} pointerdown={checkAnswer}>
            <Sprite ref={spriteRef} texture={resources[`alien0${randomIdx}`]} anchor={0.5} name={`alien0${idx + 1}`} />
            <Text
                text={problem?.aliens[idx].word}
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
                    <Sprite texture={resources[`combo0${combo}`]} anchor={0.5} position={[0, -80]} />
                </>
            )}
        </Container>
    );
};
