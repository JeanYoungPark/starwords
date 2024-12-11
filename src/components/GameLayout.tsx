import { Container, PixiRef, Sprite } from "@pixi/react";
import { Sound } from "@pixi/sound";
import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { PixiButton } from "./PixiButton";
// import { PixiButton } from "./PixiButton";

export const GameLayout = ({ children }: { children: ReactNode }) => {
    const resources = useContext(ResourceContext);
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const [active, setActive] = useState(true);
    const bgmAudio = useRef<Sound>();

    const toggleSound = () => {
        setActive((prev) => {
            if (prev) {
                // 음소거
                bgmAudio.current?.pause();
            } else {
                // 다시 재생
                bgmAudio.current?.play({
                    loop: true,
                });
            }
            return !prev;
        });
    };

    useEffect(() => {
        if (resources) {
            bgmAudio.current = resources.audioBgm;
            bgmAudio.current?.play({ loop: true });
        }

        return () => {
            bgmAudio.current?.stop();
        };
    }, [resources]);

    if (!resources) return null;

    return (
        <Container ref={containerRef}>
            {children}
            <PixiButton
                name='bgmBtn'
                position={[41, 29]}
                defaultTexture={resources.soundOn}
                sound={resources.audioBgm.sound}
                toggle={{
                    active: true,
                    initToggle: true,
                    texture: resources.soundOff,
                    onToggle: toggleSound,
                }}
                align='LEFT'
                verticalAlign='TOP'
            />
            {!active && <Sprite name='soundText' texture={resources.soundText} position={[20, 100]} scale={0.7} />}
            <Sprite name='close' texture={resources.close} position={[1840, 20]} scale={0.7} />
        </Container>
    );
};
