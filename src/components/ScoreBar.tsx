import { PixiRef, Sprite, Text, useTick } from "@pixi/react";
import { Dispatch, MutableRefObject, SetStateAction, useContext, useEffect, useRef } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { TextStyle, Sprite as PIXISprite } from "pixi.js";
import { useRecoilValue } from "recoil";
import { comboState } from "../store/gameStore";

export const ScoreBar = ({
    sec,
    alienState,
    setAlienState,
    handleIncorrect,
}: {
    sec: MutableRefObject<number>;
    alienState: string;
    setAlienState: Dispatch<SetStateAction<string>>;
    handleIncorrect: () => void;
}) => {
    const { resources, gameData } = useContext(ResourceContext);
    const combo = useRecoilValue(comboState);

    const timeLeft = useRef(60);
    const timeSpeed = useRef(0);
    const textRef = useRef<PixiRef<typeof Text>>(null);
    const gaugeRef = useRef<PixiRef<typeof Sprite>>(null);

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
        setAlienState("START");
    }, []);

    useEffect(() => {
        if (alienState === "START") {
            const eachSecCheck = setInterval(() => {
                sec.current += 1;

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
    }, [alienState, sec]);

    useTick((delta) => {
        if (alienState === "START") {
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

            {[1380, 1450, 1520, 1590].map((x, i) => {
                const texture = i < combo ? resources[`comboBall0${i + 1}`] : resources.comboBall;

                return (
                    <>
                        <Sprite key={i} texture={texture} position={[x, 950]} />
                        {combo === i + 1 && (
                            <Sprite name={`comboText0${i + 1}`} texture={resources[`comboBallText0${combo}`]} anchor={0.5} position={[x + 34, 950]} />
                        )}
                    </>
                );
            })}
            <Sprite texture={combo === 5 ? resources.maxComboBallOn : resources.maxComboBall} position={[1670, 900]} />

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
};
