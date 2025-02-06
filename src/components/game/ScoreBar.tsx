import { Container, PixiRef, Sprite, Text, useTick } from "@pixi/react";
import { memo, MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { TextStyle, Sprite as PIXISprite } from "pixi.js";
import { useRecoilState, useRecoilValue } from "recoil";
import { isComboState, scoreState } from "../../store/gameStore";
import { COMBO_TEXT_POSITION, MAX_COMBO_NUMBER } from "../../constants/commonConstants";
import { ComboMaxIcon } from "./ComboMaxIcon";
import { ComboIcon } from "./ComboIcon";

interface ScoreBarProps {
    sec: MutableRefObject<number>;
    handleIncorrect: () => void;
}

export const ScoreBar = memo(({ sec, handleIncorrect }: ScoreBarProps) => {
    const { resources, gameData } = useContext(ResourceContext);
    const [isCombo, setIsCombo] = useRecoilState(isComboState);
    const score = useRecoilValue(scoreState);

    const timeLeft = useRef(60);
    const timeSpeed = useRef(0);

    const textRef = useRef<PixiRef<typeof Text>>(null);
    const gaugeRef = useRef<PixiRef<typeof Sprite>>(null);
    const [gameState, setGameState] = useState<string>("STANDBY");

    useEffect(() => {
        console.log("MaxComboIcon rendered");
        return () => {
            console.log("MaxComboIcon unmounted");
        };
    }, []);

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
            <Sprite texture={isCombo ? resources.gameComboScoreBg : resources.gameScoreBg} position={isCombo ? [264, 920] : [300, 920]} />

            <Text
                text={`${score}`}
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
                return <Container key={i}>{i + 1 === MAX_COMBO_NUMBER ? <ComboMaxIcon data={data} /> : <ComboIcon i={i} data={data} />}</Container>;
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
