import { Container, PixiRef, Sprite, Text } from "@pixi/react";
import { memo, useContext, useEffect, useRef } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilState, useSetRecoilState } from "recoil";
import { answerCntState } from "../../store/gameStore";
import { COMBO_TEXT_POSITION, MAX_COMBO_NUMBER } from "../../constants/commonConstants";
import { ComboMaxIcon } from "./ComboMaxIcon";
import { ComboIcon } from "./ComboIcon";
import { actionState, gameActionState } from "../../store/assetsStore";
import { Actions, GameActions } from "../../types/actionsType";
import { GameContext } from "../../context/GameContext";
import { Gauge } from "./Gauge";
import { SCORE_TEXT_STYLE, TIME_TEXT_STYLE } from "../../constants/gameConstants";
import { useIncorrectList } from "../../hooks/game/useIncorrectList";
import { numberComma } from "../../util";
import { sound } from "@pixi/sound";

export const ScoreBar = memo(() => {
    const { resources, gameData } = useContext(ResourceContext);
    const { sec, comboActive, setInCorrectAnimActive, setAnimActive } = useContext(GameContext);
    const { handleIncorrectList } = useIncorrectList();
    const setAction = useSetRecoilState(actionState);
    const [answerCnt, setAnswerCnt] = useRecoilState(answerCntState);
    const [gameAction, setGameAction] = useRecoilState(gameActionState);

    const secTimeoutId = useRef<NodeJS.Timeout | undefined>(undefined);
    const totalTimeoutId = useRef<NodeJS.Timeout | undefined>(undefined);

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
        handleIncorrectList();
        setAnswerCnt((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
        setInCorrectAnimActive(true);
        setAnimActive(true);
        sound.play("gameIncorrect");
    };

    useEffect(() => {
        if (gameAction === GameActions.START) {
            const eachSecCheck = () => {
                sec.current += 1;

                if (sec.current === 6) {
                    handleIncorrect();
                    sec.current = 0;
                }

                secTimeoutId.current = setTimeout(eachSecCheck, 1000);
            };

            const totalTime = () => {
                if (timeLeft.current <= 0) {
                    clearTimeout(secTimeoutId.current);
                    clearTimeout(totalTimeoutId.current);

                    setAction(Actions.GAME_FINISH);
                } else {
                    timeLeft.current = Math.max(timeLeft.current - 1, 0);
                    updateTimeDisplay();
                }

                totalTimeoutId.current = setTimeout(totalTime, 1000);
            };

            eachSecCheck();
            totalTime();

            return () => {
                if (secTimeoutId.current) clearTimeout(secTimeoutId.current);
                if (totalTimeoutId.current) clearTimeout(totalTimeoutId.current);
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
            <Sprite texture={comboActive ? resources.gameComboScoreBg : resources.gameScoreBg} position={comboActive ? [264, 920] : [300, 920]}>
                <Text
                    text={`${numberComma(answerCnt.correct * 100 + answerCnt.combo * 200)}`}
                    position={comboActive ? [resources.gameComboScoreBg.width / 2 + 20, 80] : [resources.gameScoreBg.width / 2, 80]}
                    style={SCORE_TEXT_STYLE}
                    anchor={0.5}
                />
            </Sprite>

            {COMBO_TEXT_POSITION.map((data, i) => {
                return <Container key={i}>{i + 1 === MAX_COMBO_NUMBER ? <ComboMaxIcon data={data} /> : <ComboIcon i={i} data={data} />}</Container>;
            })}

            <Text ref={textRef} position={[1230, 940]} style={TIME_TEXT_STYLE} />
        </>
    );
});
