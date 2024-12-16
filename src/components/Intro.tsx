import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, PixiRef, Sprite } from "@pixi/react";
import gsap from "gsap";
import { ResourceContext } from "../context/ResourceContext";
import { actionState } from "../store/assetsStore";
import { useRecoilState } from "recoil";
import { Actions } from "../types/actionsType";
import { Sprite as PixiSprite } from "pixi.js";
import { PixiButton } from "./PixiButton";
import { sound } from "@pixi/sound";

export const Intro = () => {
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const { resources, sounds } = useContext(ResourceContext);
    const [action, setAction] = useRecoilState(actionState);
    const [active, setActive] = useState(false);

    const toggleSound = () => {
        sound.toggleMuteAll();
        setActive((prev) => !prev);
    };

    const onTouchEnd = () => {
        setAction(Actions.GUIDE);
    };

    useEffect(() => {
        sounds["audioIntroBgm"].play({ loop: true });
    }, [sounds]);

    useEffect(() => {
        const runAnimation = () => {
            if (containerRef.current) {
                const title = containerRef.current.getChildByName("title") as PixiSprite;
                const startBtn = containerRef.current.getChildByName("startBtn");
                const rankingBtn = containerRef.current.getChildByName("rankingBtn");

                if (title && startBtn && rankingBtn) {
                    // 애니메이션 설정
                    gsap.fromTo(
                        title.scale,
                        {
                            x: 0,
                            y: 0,
                        },
                        { x: 1, y: 1, duration: 2, repeat: 0, ease: "elastic.out(1, 0.3)" }
                    );
                    gsap.to(title.scale, {
                        x: 1.05,
                        y: 1.05,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        delay: 1.5,
                        ease: "sine",
                    });
                    // startBtn 움직임 제어
                    gsap.fromTo(
                        startBtn,
                        {
                            x: 0,
                        },
                        {
                            x: 720,
                            duration: 0.7,
                            ease: "sign",
                        }
                    );
                    // rankingBtn 움직임 제어
                    gsap.fromTo(
                        rankingBtn,
                        { x: 1300 },
                        {
                            x: 720,
                            duration: 0.7,
                            ease: "sign",
                        }
                    );
                }
            }
        };
        runAnimation();
    }, []);

    if (!resources || !sounds) return null;

    return (
        <Container ref={containerRef}>
            <Sprite name='bg' texture={resources.bg} position={[0, 0]} />

            <Sprite name='bottomLight' texture={resources.bottomLight} position={[100, 550]} />
            <Sprite name='topLight' texture={resources.topLight} position={[200, 0]} />
            <Sprite name='planet01' texture={resources.planet01} position={[-150, 0]} scale={0.8} />
            <Sprite name='planet02' texture={resources.planet02} position={[1250, 420]} scale={0.8} />
            <Sprite name='rocket' texture={resources.rocket} position={[1500, 250]} scale={0.7} />
            <Sprite name='spaceship' texture={resources.spaceship} position={[0, 580]} scale={0.7} />

            <Sprite name='title' texture={resources.title} position={[1000, 300]} anchor={[0.5, 0.5]} />
            <Sprite name='titleBg' texture={resources.titleBg} position={[280, 520]} width={1358} height={150} alpha={0.5} />
            <Sprite name='startBtn' texture={resources.startBtn} position={[720, 700]} />
            <Sprite name='rankingBtn' texture={resources.rankingBtn} position={[720, 840]} />

            <PixiButton
                name='bgmBtn'
                position={[41, 29]}
                defaultTexture={resources.soundOn}
                toggle={{
                    active: true,
                    initToggle: true,
                    texture: resources.soundOff,
                    onToggle: toggleSound,
                }}
                align='LEFT'
                verticalAlign='TOP'
            />
            <Sprite name='soundText' texture={resources.soundText} position={[20, 100]} scale={0.7} visible={active} />

            <PixiButton
                position={[41, 29]}
                defaultTexture={resources.help}
                sound={sounds.audioIntoBtn}
                align='RIGHT'
                verticalAlign='BOTTOM'
                onTouchEnd={onTouchEnd}
            />
        </Container>
    );
};
