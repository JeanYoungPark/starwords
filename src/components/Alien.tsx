import { AnimatedSprite, Container, PixiRef, Sprite, Text } from "@pixi/react";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProblemType, WordType } from "../types/resourcesType";
import { TextStyle, Container as PIXIContainer, Sprite as PIXISprite } from "pixi.js";
import { ResourceContext } from "../context/ResourceContext";
import gsap from "gsap";

export const Alien = ({
    randomIdx,
    idx,
    position,
    problem,
    createProblem,
}: {
    randomIdx: number;
    idx: number;
    position: { x: number; y: number };
    problem:
        | {
              item: WordType;
              aliens: ProblemType[];
          }
        | undefined;
    createProblem: (gameData: any, contentsData: any) => void;
}) => {
    const { resources, gameData, contentsData } = useContext(ResourceContext);
    const [isDestroying, setIsDestroying] = useState(false);
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const spriteRef = useRef<PixiRef<typeof Sprite>>(null);
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

    const checkAnswer = () => {
        if (problem?.aliens[idx].correct === "Y") {
            const sprite = spriteRef.current as PIXISprite;

            if (sprite) {
                sprite.destroy();
                setIsDestroying(true);

                if (timelineRef.current) {
                    timelineRef.current.kill();
                    timelineRef.current = null;
                }
            }
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
            {isDestroying && (
                <AnimatedSprite
                    textures={destroy}
                    anchor={0.5}
                    isPlaying={true}
                    animationSpeed={0.2}
                    loop={false}
                    position={[0, 0]}
                    onComplete={() => {
                        setIsDestroying(false);
                        createProblem(gameData, contentsData);
                    }}
                />
            )}
        </Container>
    );
};
