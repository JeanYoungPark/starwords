import { Container, PixiRef, Sprite, Text } from "@pixi/react";
import { memo, useContext, useEffect, useRef } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { comboScoreState, scoreState } from "../../store/gameStore";
import { COMBO_TEXT_POSITION, MAX_COMBO_NUMBER } from "../../constants/commonConstants";
import { ComboMaxIcon } from "./ComboMaxIcon";
import { ComboIcon } from "./ComboIcon";
import { actionState, gameActionState } from "../../store/assetsStore";
import { Actions, GameActions } from "../../types/actionsType";
import { GameContext } from "../../context/GameContext";
import { Gauge } from "./Gauge";
import { SCORE_TEXT_STYLE, TIME_TEXT_STYLE } from "../../constants/gameConstants";

export const ScoreBar = memo(() => {
    const { resources, sounds, gameData } = useContext(ResourceContext);
    const { sec, comboActive, setInCorrectAnimActive, setAnimActive } = useContext(GameContext);
    const setAction = useSetRecoilState(actionState);
    const score = useRecoilValue(scoreState);
    const comboScore = useRecoilValue(comboScoreState);
    const [gameAction, setGameAction] = useRecoilState(gameActionState);

    const timeLeft = useRef(60);
    const timeSpeed = useRef(0);

    const textRef = useRef<PixiRef<typeof Text>>(null);

    const timeSetting = () => {
        timeLeft.current = gameData.leftTime;
        timeSpeed.current = resources.gauge.width / gameData.leftTime / 60;
        setGameAction(GameActions.START);
    };

    const updateTimeDisplay = () => {
        if (textRef.current) {
            const minutes = Math.floor(timeLeft.current / 60);
            const seconds = timeLeft.current % 60;
            textRef.current.text = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
        }
    };

    const handleIncorrect = () => {
        setInCorrectAnimActive(true);
        setAnimActive(true);
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
                    updateTimeDisplay();
                }
            }, 1000);

            return () => {
                clearInterval(eachSecCheck);
                clearInterval(totalTime);
            };
        }

        if (gameAction === GameActions.STAND_BY) {
            timeSetting();
        }
    }, [gameAction]);

    return (
        <>
            <Sprite texture={resources.gameBarBg} position={[0, 920]} width={2000} height={250} />
            <Gauge timeLeft={timeLeft} timeSpeed={timeSpeed} />
            <Sprite texture={resources.gameBar} position={[-600, 820]} />
            <Sprite texture={comboActive ? resources.gameComboScoreBg : resources.gameScoreBg} position={comboActive ? [264, 920] : [300, 920]} />

            <Text text={`${score + comboScore}`} position={[425, 1000]} style={SCORE_TEXT_STYLE} anchor={0.5} />

            {COMBO_TEXT_POSITION.map((data, i) => {
                return <Container key={i}>{i + 1 === MAX_COMBO_NUMBER ? <ComboMaxIcon data={data} /> : <ComboIcon i={i} data={data} />}</Container>;
            })}

            <Text
                ref={textRef}
                text={`${Math.floor(timeLeft.current / 60)}:${Math.floor(timeLeft.current % 60)}`}
                position={[1230, 940]}
                style={TIME_TEXT_STYLE}
            />
        </>
    );
});
