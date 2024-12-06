import React, { useEffect, useRef } from "react";
import { Container, PixiRef, Sprite } from "@pixi/react";
import { Resource } from "../types/resourcesType";
import gsap from "gsap";
import * as PIXI from "pixi.js";

export const Intro = ({ resources }: { resources: Resource | null }) => {
    const containerRef = useRef<PixiRef<typeof Container>>(null);

    useEffect(() => {
        const runAnimation = () => {
            if (containerRef.current) {
                const title = containerRef.current.getChildByName("title") as PIXI.Sprite;
                const startBtn = containerRef.current.getChildByName("startBtn") as PIXI.Sprite;
                const rankingBtn = containerRef.current.getChildByName("rankingBtn") as PIXI.Sprite;

                if (title && startBtn && rankingBtn) {
                    // title의 anchor 설정 및 중심으로 이동
                    title.anchor.set(0.5, 0.5);
                    title.x += title.width / 2;
                    title.y += title.height / 2;

                    // 애니메이션 설정
                    gsap.to(title.scale, {
                        x: 1.05,
                        y: 1.05,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sign",
                        delay: 0.5,
                    });

                    // startBtn 움직임 제어
                    gsap.to(startBtn, {
                        x: 720,
                        duration: 0.7,
                        ease: "sign",
                    });

                    // rankingBtn 움직임 제어
                    gsap.to(rankingBtn, {
                        x: 720,
                        duration: 0.7,
                        ease: "sign",
                    });
                }
            }
        };

        requestAnimationFrame(runAnimation);
    }, []);

    if (!resources) return null;

    return (
        <Container ref={containerRef}>
            <Sprite name='bg' texture={resources.bg} position={[-400, 0]} />

            <Sprite name='bottomLight' texture={resources.bottomLight} position={[100, 550]} />
            <Sprite name='topLight' texture={resources.topLight} position={[200, 0]} />
            <Sprite name='planet01' texture={resources.planet01} position={[-150, 0]} scale={0.8} />
            <Sprite name='planet02' texture={resources.planet02} position={[1150, 450]} scale={0.8} />
            <Sprite name='rocket' texture={resources.rocket} position={[1500, 250]} scale={0.7} />
            <Sprite name='spaceship' texture={resources.spaceship} position={[0, 650]} scale={0.7} />

            <Sprite name='title' texture={resources.title} position={[550, 120]} />
            <Sprite name='titleBg' texture={resources.titleBg} position={[280, 520]} width={1350} height={150} alpha={0.5} />
            <Sprite name='startBtn' texture={resources.startBtn} position={[0, 700]} />
            <Sprite name='rankingBtn' texture={resources.rankingBtn} position={[1300, 840]} />
        </Container>
    );
};
