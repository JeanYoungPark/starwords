import { Container, Sprite, Text } from "@pixi/react";
import { MutableRefObject, useContext, useEffect, useMemo } from "react";
import { Container as PIXIContainer, Sprite as PIXISprite, TextStyle } from "pixi.js";
import { GameContext } from "../../context/GameContext";
import { ProblemType } from "../../types/resourcesType";
import { useSetRecoilState } from "recoil";
import { answerCntState, comboScoreState, scoreState } from "../../store/gameStore";
import { ResourceContext } from "../../context/ResourceContext";
import { MAX_COMBO_NUMBER } from "../../constants/commonConstants";
import gsap from "gsap";

interface AlienContainerProps {
    alienRef: MutableRefObject<PIXIContainer | null>;
    spriteRef: MutableRefObject<PIXISprite | null>;
    idx: number;
    problem: ProblemType;
    setCorrectAnimActive: (val: boolean) => void;
    setDestroyAnimActive: (val: boolean) => void;
}

export const AlienContainer = ({ alienRef, spriteRef, idx, problem, setCorrectAnimActive, setDestroyAnimActive }: AlienContainerProps) => {
    const { resources, sounds } = useContext(ResourceContext);
    const { sec, comboActive, comboCnt, comboDestroyNum, setComboCnt, setInCorrectAnimActive, setComboDestroyNum } = useContext(GameContext);
    const setAnswer = useSetRecoilState(answerCntState);
    const setScore = useSetRecoilState(scoreState);
    const setComboScore = useSetRecoilState(comboScoreState);

    const randomIdx = useMemo(() => {
        return Math.floor(Math.random() * 5) + 1;
    }, [problem]);

    const handleOnClickCorrect = () => {
        const alien = alienRef.current;
        const sprite = spriteRef.current as PIXISprite;

        if (!alien || !sprite) return;

        setCorrectAnimActive(true);
        setAnswer((prev) => ({ correct: prev.correct + 1, incorrect: prev.incorrect }));
        sounds["gameCorrect"].play();

        alien.destroy();
        gsap.killTweensOf(sprite);
        spriteRef.current = null;

        if (comboCnt < MAX_COMBO_NUMBER) {
            // 정답일 경우 combo 증가 (5 이하인 경우에)
            if (comboActive) {
                setComboScore((prev) => (prev += 100));
            }

            setScore((prev) => (prev += 100));
            setComboCnt((prev) => (prev += 1));
        }
    };

    const handleOnClickIncorrect = () => {
        setInCorrectAnimActive(true);
        sounds["gameIncorrect"].play();

        setAnswer((prev) => ({ correct: prev.correct, incorrect: prev.incorrect + 1 }));
    };

    const checkAnswer = () => {
        if (problem.correct === "Y") {
            handleOnClickCorrect();
        } else {
            handleOnClickIncorrect();
        }

        sec.current = 0;
    };

    useEffect(() => {
        if (comboDestroyNum && comboDestroyNum === idx) {
            const alien = alienRef.current;
            const sprite = spriteRef.current as PIXISprite;

            if (alien && sprite) {
                sounds["alienDestroy"].play();
                setDestroyAnimActive(true);
                setComboDestroyNum(NaN);

                gsap.killTweensOf(sprite);
                alien.destroy();
                spriteRef.current = null;
            }
        }
    }, [comboDestroyNum, idx]);

    return (
        <Container ref={alienRef} interactive={true} pointerdown={checkAnswer}>
            <Sprite ref={spriteRef} texture={resources[`alien0${randomIdx}`]} anchor={0.5} name={`alien0${idx + 1}`} />
            <Text
                name={`alienText0${idx + 1}`}
                text={problem.word}
                position={[0, 100]}
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
};
