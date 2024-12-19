import { useContext, useRef } from "react";
import { Container, PixiRef, Sprite } from "@pixi/react";
import { ResourceContext } from "../context/ResourceContext";
import { PixiButton } from "./PixiButton";
import { UseIntroLogic } from "../hooks/intro/UseIntroLogic";
import { UseIntroAnimations } from "../hooks/intro/UseIntroAnimations";

export const Intro = () => {
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const { resources, sounds } = useContext(ResourceContext);
    const { active, toggleSound, handleStartGuide, handleStart, handleRanking } = UseIntroLogic();
    UseIntroAnimations(containerRef);

    if (!resources || !sounds) return null;

    return (
        <Container ref={containerRef}>
            <Sprite name='bg' texture={resources.bg} anchor={0.5} position={[1024, 640]} />

            <Sprite name='bottomLight' texture={resources.bottomLight} position={[100, 550]} />
            <Sprite name='topLight' texture={resources.topLight} position={[200, 0]} />
            <Sprite name='planet01' texture={resources.planet01} position={[-150, 0]} scale={0.8} />
            <Sprite name='planet02' texture={resources.planet02} position={[1250, 420]} scale={0.8} />
            <Sprite name='rocket' texture={resources.rocket} position={[1500, 250]} scale={0.7} />
            <Sprite name='spaceship' texture={resources.spaceship} position={[0, 580]} scale={0.7} />

            <Sprite name='title' texture={resources.title} position={[980, 300]} anchor={[0.5, 0.5]} />
            <Sprite name='titleBg' texture={resources.titleBg} position={[280, 520]} width={1358} height={150} alpha={0.5} />

            <PixiButton
                name='startBtn'
                position={[720, 750]}
                defaultTexture={resources.startBtn}
                sound={sounds.audioIntoBtn}
                onTouchEnd={handleStart}
            />

            <PixiButton
                name='rankingBtn'
                position={[720, 890]}
                defaultTexture={resources.rankingBtn}
                sound={sounds.audioIntoBtn}
                onTouchEnd={handleRanking}
            />

            <PixiButton
                name='bgmBtn'
                position={[60, 70]}
                defaultTexture={resources.soundOn}
                toggle={{
                    active: true,
                    initToggle: true,
                    texture: resources.soundOff,
                    onToggle: toggleSound,
                }}
                align='LEFT'
            />
            <Sprite name='soundText' texture={resources.soundText} position={[40, 130]} scale={0.7} visible={active} />

            <PixiButton
                position={[1860, 1020]}
                defaultTexture={resources.help}
                sound={sounds.audioIntoBtn}
                align='RIGHT'
                onTouchEnd={handleStartGuide}
            />
        </Container>
    );
};
