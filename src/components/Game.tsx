import { Container, PixiRef, Sprite, Text, useTick } from "@pixi/react";
import { useContext, useEffect, useRef } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { PixiButton } from "./PixiButton";
import { TextStyle } from "pixi.js";
import gsap from "gsap";
import * as PIXI from "pixi.js";

export const Game = () => {
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const { resources, sounds } = useContext(ResourceContext);
    const timeoutLength = 6000;
    const timer = useRef();

    useTick((delta) => {});

    useEffect(() => {
        if (containerRef.current) {
            const alienCont = containerRef.current.getChildByName("alien") as PIXI.Container;

            if (alienCont) {
                const alien01 = alienCont.getChildByName("alien01");
                const alien02 = alienCont.getChildByName("alien02");
                const alien03 = alienCont.getChildByName("alien03");
                const alien04 = alienCont.getChildByName("alien04");
                gsap.fromTo(alien01, { x: 200, y: 150 }, { x: 0, y: 0, duration: 0.5, ease: "sign" });
                gsap.fromTo(alien02, { x: 200, y: 150 }, { x: 600, y: 0, duration: 0.5, ease: "sign" });
                gsap.fromTo(alien03, { x: 200, y: 150 }, { x: 0, y: 300, duration: 0.5, ease: "sign" });
                gsap.fromTo(alien04, { x: 200, y: 150 }, { x: 600, y: 300, duration: 0.5, ease: "sign" });
            }
        }
    }, [containerRef]);

    return (
        <Container ref={containerRef}>
            <Sprite texture={resources.bg} anchor={0.5} position={[1024, 640]} />
            <Sprite texture={resources.gamePlanet01} position={[-50, 0]} />
            <Sprite texture={resources.gamePlanet02} position={[1500, 720]} />

            <PixiButton
                name='reload'
                position={[60, 70]}
                defaultTexture={resources.reload}
                sound={sounds.audioIntoBtn}
                align='LEFT'
                // onTouchEnd={onTouchEnd}
            />

            <Text
                text='(색깔이)밝은, 선명한'
                position={[950, 180]}
                style={
                    new TextStyle({
                        fontFamily: "NotoSans",
                        fontSize: 47,
                        fill: "rgba(255, 234, 68)",
                        fontWeight: "700",
                    })
                }
                anchor={[0.5, 0.5]}
            />

            <Container position={[530, 270]} name='alien' scale={0.9}>
                {Array.from({ length: 4 }, (_, idx: number) => {
                    const left = (idx + 2) % 2 ? 600 : 0;
                    const top = idx > 1 ? 300 : 0;

                    return (
                        <Container position={[left, top]} name={`alien0${idx + 1}`}>
                            <Sprite texture={resources.alien01} />
                            <Text
                                text='wizard'
                                position={[resources.alien01.width / 2, 200]}
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
                    );
                })}
            </Container>

            <Sprite texture={resources.gameBarBg} position={[0, 920]} width={2000} height={250} />
            <Sprite texture={resources.gauge} position={[720, 980]} />
            <Sprite texture={resources.gameBar} position={[-600, 820]} />
            <Sprite texture={resources.gameScoreBg} position={[300, 920]} />
            <Text
                text='0'
                position={[425, 1000]}
                style={
                    new TextStyle({
                        fontSize: 50,
                        fill: "rgba(255, 234, 68)",
                        fontFamily: "NotoSans",
                        fontWeight: "bold",
                    })
                }
                anchor={0.5}
            />

            <Sprite texture={resources.comboBall} position={[1380, 950]} />
            <Sprite texture={resources.comboBall} position={[1450, 950]} />
            <Sprite texture={resources.comboBall} position={[1520, 950]} />
            <Sprite texture={resources.comboBall} position={[1590, 950]} />
            <Sprite texture={resources.maxComboBall} position={[1670, 900]} />

            <Text
                text='0:00'
                position={[1230, 940]}
                style={
                    new TextStyle({
                        fontFamily: "NotoSans",
                        fontWeight: "400",
                        fontSize: 20,
                        fill: "rgba(177, 184, 255)",
                    })
                }
            />
        </Container>
    );
};
