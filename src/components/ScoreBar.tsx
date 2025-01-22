import { AnimatedSprite, Container, PixiRef, Sprite, Text, useTick } from "@pixi/react";
import { Dispatch, memo, MutableRefObject, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { TextStyle, Sprite as PIXISprite } from "pixi.js";
import { useRecoilValue } from "recoil";
import { comboState } from "../store/gameStore";
import gsap from "gsap";

const COMBO_TEXT_POSITION = [
    { x: 1380, y: 950 },
    { x: 1450, y: 950 },
    { x: 1520, y: 950 },
    { x: 1590, y: 950 },
    { x: 1670, y: 900 },
];

export const ScoreBar = memo(({ sec, handleIncorrect }: { sec: MutableRefObject<number>; handleIncorrect: () => void }) => {
    const { resources, gameData } = useContext(ResourceContext);
    const combo = useRecoilValue(comboState);

    const timeLeft = useRef(60);
    const timeSpeed = useRef(0);
    const textRef = useRef<PixiRef<typeof Text>>(null);
    const gaugeRef = useRef<PixiRef<typeof Sprite>>(null);
    // const comboContainerRef = useRef<PixiRef<typeof Container>>(null);
    const comboTextRefs = useRef<PixiRef<typeof Sprite>[] | null[]>([]);
    const comboMaxContainerRef = useRef<PixiRef<typeof Container>>(null);
    const [gameState, setGameState] = useState<string>("STANDBY");

    const maxComboOn = [resources.maxComboBallOn01, resources.maxComboBallOn02];

    const handleMaxCombo = () => {};

    useEffect(() => {
        if (!combo) return;

        const isLast = combo === COMBO_TEXT_POSITION.length;

        const comboText = comboTextRefs.current[combo - 1] as PIXISprite;
        const comboMaxContainer = comboMaxContainerRef.current;
        const comboMaxBg = comboMaxContainer?.getChildByName("comboMaxOnBg") as PIXISprite;

        if (isLast) {
            gsap.to(comboMaxBg, {
                rotation: 100,
                duration: 0.5,
                repeat: -1,
                ease: "sign",
            });
        } else {
            gsap.fromTo(
                comboText,
                { y: COMBO_TEXT_POSITION[combo - 1].y },
                {
                    y: COMBO_TEXT_POSITION[combo - 1].y - 30,
                    duration: 0.5,
                    ease: "sign",
                    onComplete: () => {
                        setTimeout(() => {
                            comboText.visible = false;
                        }, 500);
                    },
                }
            );
        }
    }, [combo]);

    useEffect(() => {
        const gauge = gaugeRef.current as PIXISprite;

        if (gauge) {
            gauge.x = 720;
            gauge.y = 980;
        }
    }, []);

    useEffect(() => {
        timeLeft.current = gameData.leftTime;
        timeSpeed.current = resources.gauge.width / gameData.leftTime / 60;
        setGameState("START");
    }, []);

    useEffect(() => {
        if (gameState === "START") {
            const eachSecCheck = setInterval(() => {
                sec.current += 1;
                console.log(sec.current);
                if (sec.current === 5) {
                    handleIncorrect();
                    sec.current = 0;
                }
            }, 1000);

            const totalTime = setInterval(() => {
                if (timeLeft.current === 0) {
                    clearInterval(eachSecCheck);
                    clearInterval(totalTime);
                    // setAction(Actions.GAME_FINISH);
                } else {
                    timeLeft.current = Math.max(timeLeft.current - 1, 0);

                    if (textRef.current) {
                        const minutes = Math.floor(timeLeft.current / 60);
                        const seconds = timeLeft.current % 60;

                        textRef.current.text = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
                    }
                }
            }, 1000);

            return () => {
                clearInterval(eachSecCheck);
                clearInterval(totalTime);
            };
        }
    }, [gameState, sec]);

    useTick((delta) => {
        if (gameState === "START") {
            if (timeLeft.current > 0) {
                const gauge = gaugeRef.current as PIXISprite;

                if (gauge) {
                    gauge.x -= timeSpeed.current * delta;

                    if (timeLeft.current === 10) {
                        gauge.texture = resources.gauge2;
                    }
                }
            }
        }
    });

    return (
        <>
            <Sprite texture={resources.gameBarBg} position={[0, 920]} width={2000} height={250} />
            <Sprite ref={gaugeRef} name='gauge' texture={resources.gauge} />
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

            {COMBO_TEXT_POSITION.map((data, i) => {
                const isLast = i === COMBO_TEXT_POSITION.length - 1;
                const texture = i < combo ? resources[`comboBallOn0${i + 1}`] : resources.comboBall;

                return (
                    <Container key={i}>
                        {isLast ? (
                            <Container ref={comboMaxContainerRef} interactive={true} onclick={handleMaxCombo}>
                                {combo === i + 1 ? (
                                    <>
                                        <Sprite
                                            name='comboMaxOnBg'
                                            texture={resources.maxComboBallOnBg}
                                            anchor={0.5}
                                            position={[data.x + 85, data.y + 91]}
                                        />
                                        <AnimatedSprite
                                            textures={maxComboOn}
                                            loop={true}
                                            isPlaying={true}
                                            anchor={0.5}
                                            animationSpeed={0.2}
                                            position={[data.x + 85, data.y + 91]}
                                        />
                                    </>
                                ) : (
                                    <Sprite key={i} texture={resources.maxComboBall} position={[data.x, data.y]} />
                                )}
                            </Container>
                        ) : (
                            <>
                                <Sprite texture={texture} position={[data.x, data.y]} />
                                {combo === i + 1 && (
                                    <Sprite
                                        ref={(el) => {
                                            comboTextRefs.current[i] = el;
                                        }}
                                        name={`comboText0${i + 1}`}
                                        texture={resources[`comboBallOnText0${combo}`]}
                                        anchor={0.5}
                                        position={[data.x + 34, data.y - 20]}
                                    />
                                )}
                            </>
                        )}
                    </Container>
                );
            })}

            <Text
                ref={textRef}
                text={`${Math.floor(timeLeft.current / 60)}:${Math.floor(timeLeft.current % 60)}`}
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
        </>
    );
});
