import { Container, PixiRef, Sprite, Text, useTick } from "@pixi/react";
import { memo, useContext, useEffect, useRef } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { TextStyle, Sprite as PIXISprite } from "pixi.js";
import { useRecoilState, useRecoilValue } from "recoil";
import { comboScoreState, scoreState } from "../../store/gameStore";
import { COMBO_TEXT_POSITION, MAX_COMBO_NUMBER } from "../../constants/commonConstants";
import { ComboMaxIcon } from "./ComboMaxIcon";
import { ComboIcon } from "./ComboIcon";
import { actionState, gameActionState } from "../../store/assetsStore";
import { Actions, GameActions } from "../../types/actionsType";
import { GameContext } from "../../context/GameContext";

export const ScoreBar = memo(() => {
    const { resources, sounds, gameData } = useContext(ResourceContext);
    const { sec, setInCorrectAnimActive, comboActive } = useContext(GameContext);
    const [action, setAction] = useRecoilState(actionState);
    const [gameAction, setGameAction] = useRecoilState(gameActionState);
    const score = useRecoilValue(scoreState);
    const comboScore = useRecoilValue(comboScoreState);

    const timeLeft = useRef(60);
    const timeSpeed = useRef(0);

    const textRef = useRef<PixiRef<typeof Text>>(null);
    const gaugeRef = useRef<PixiRef<typeof Sprite>>(null);

    const timeSetting = () => {
        timeLeft.current = gameData.leftTime;
        timeSpeed.current = resources.gauge.width / gameData.leftTime / 60;
        setGameAction(GameActions.START);
    };

    const gaugeSetting = () => {
        const gauge = gaugeRef.current as PIXISprite;

        if (gauge) {
            gauge.x = 720;
            gauge.y = 980;
        }
    };

    const handleIncorrect = () => {
        setInCorrectAnimActive(true);
        sounds["gameIncorrect"].play();
    };

    useEffect(() => {
        if (gameAction === GameActions.START) {
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
                    setAction(Actions.GAME_FINISH);
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
        } else if (gameAction === GameActions.STAND_BY) {
            // 새로고침
            timeSetting();
            gaugeSetting();
        }
    }, [gameAction, sec]);

    useTick((delta) => {
        if (gameAction === GameActions.START) {
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
            <Sprite texture={comboActive ? resources.gameComboScoreBg : resources.gameScoreBg} position={comboActive ? [264, 920] : [300, 920]} />

            <Text
                text={`${score + comboScore}`}
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
