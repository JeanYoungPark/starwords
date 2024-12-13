import { Container, PixiRef, Sprite } from "@pixi/react";
import { sound } from "@pixi/sound";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { PixiButton } from "./PixiButton";

export const GameLayout = ({ children }: { children: ReactNode }) => {
    const { resources, sounds } = useContext(ResourceContext);
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const [active, setActive] = useState(true);

    const toggleSound = () => {
        sound.toggleMuteAll();
        setActive((prev) => !prev);
    };

    useEffect(() => {
        sounds["audioIntroBgm"].play({ loop: true });
    }, [sounds]);

    if (!resources) return null;

    return (
        <Container ref={containerRef}>
            {children}
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
            {!active && <Sprite name='soundText' texture={resources.soundText} position={[20, 100]} scale={0.7} />}
            <Sprite name='close' texture={resources.close} position={[1840, 20]} scale={0.7} />
        </Container>
    );
};
