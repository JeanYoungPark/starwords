import { useContext, useEffect, useRef } from "react";
import { Container, PixiRef, Sprite, Text, useApp } from "@pixi/react";
import { ResourceContext } from "../context/ResourceContext";
import { PixiButton } from "./PixiButton";
import { UseIntroLogic } from "../hooks/intro/UseIntroLogic";
import { UseIntroAnimations } from "../hooks/intro/UseIntroAnimations";
import { TextStyle } from "pixi.js";
import { useRecoilValue } from "recoil";
import { gameTypeState } from "../store/assetsStore";

export const Intro = () => {
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const { resources, sounds, contentsData } = useContext(ResourceContext);
    const gameType = useRecoilValue(gameTypeState);
    const { active, toggleSound, handleStartGuide, handleStart, handleRanking } = UseIntroLogic();
    UseIntroAnimations(containerRef);

    if (!resources || !sounds) return null;

    return (
        <Container ref={containerRef}>
            <Sprite name='bg' texture={resources.bg} anchor={0.5} position={[1024, 640]} />

            <Sprite name='bottomLight' texture={resources.bottomLight} position={[100, 550]} />
            <Sprite name='topLight' texture={resources.topLight} position={[200, 0]} />
            <Sprite name='planet01' texture={resources.planet01} position={[-150, 0]} scale={0.9} />
            <Sprite name='planet02' texture={resources.planet02} position={[1130, 350]} scale={0.9} />
            <Sprite name='rocket' texture={resources.rocket} position={[1400, 200]} />
            <Sprite name='spaceship' texture={resources.spaceship} position={[-10, 550]} scale={0.9} />

            <Sprite name='title' texture={resources.title} position={[980, 300]} anchor={[0.5, 0.5]} />
            <Container position={[1920 / 2, 510]}>
                <Sprite name='titleBg' texture={resources.titleBg} position={[-(1358 / 2), 0]} width={1358} height={150} alpha={0.5} />
                <Text
                    text={gameType === "word_master" ? contentsData.cont_title : contentsData.cont_name}
                    anchor={[0.5, 0.5]}
                    position={[0, contentsData.mid_name ? 30 : 50]}
                    style={
                        new TextStyle({
                            fontFamily: "NotoSans",
                            fontSize: 34,
                            fill: "rgba(170, 242, 246)",
                            fontWeight: "700",
                        })
                    }
                />
                {gameType !== "word_master" && (
                    <Text
                        text={contentsData.mid_name}
                        anchor={[0.5, 0.5]}
                        position={[0, 80]}
                        style={
                            new TextStyle({
                                fontFamily: "NotoSans",
                                fontSize: 34,
                                fill: "rgba(170, 242, 246)",
                                fontWeight: "700",
                            })
                        }
                    />
                )}
                <Text
                    text={gameType === "word_master" ? `Stage ${contentsData.stage}` : contentsData.cont_sub_name}
                    anchor={[0.5, 0.5]}
                    position={[0, contentsData.mid_name ? 130 : 100]}
                    style={
                        new TextStyle({
                            fontFamily: "NotoSans",
                            fontSize: 34,
                            fill: "rgba(170, 242, 246)",
                            fontWeight: "700",
                        })
                    }
                />
            </Container>

            <PixiButton
                name='startBtn'
                position={[720, 750]}
                defaultTexture={resources.startBtn}
                sound={sounds.audioIntoBtn}
                onTouchEnd={handleStart}
            />

            {gameType !== "word_master" && (
                <PixiButton
                    name='rankingBtn'
                    position={[720, 890]}
                    defaultTexture={resources.rankingBtn}
                    sound={sounds.audioIntoBtn}
                    onTouchEnd={handleRanking}
                />
            )}

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
