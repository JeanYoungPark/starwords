import { Container, Sprite, Text } from "@pixi/react";
import { MutableRefObject, useContext, useEffect, useMemo } from "react";
import { Container as PIXIContainer, Sprite as PIXISprite } from "pixi.js";
import { GameContext } from "../../context/GameContext";
import { ProblemType } from "../../types/resourcesType";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { answerCntState, problemIdxState } from "../../store/gameStore";
import { ResourceContext } from "../../context/ResourceContext";
import { MAX_COMBO_NUMBER } from "../../constants/commonConstants";
import gsap from "gsap";
import { ALIEN_TEXT_STYLE } from "../../constants/gameConstants";
import { useIncorrectList } from "../../hooks/game/useIncorrectList";
import { sound } from "@pixi/sound";

interface AlienContainerProps {
    alienRef: MutableRefObject<PIXIContainer | null>;
    spriteRef: MutableRefObject<PIXISprite | null>;
    idx: number;
    problem: ProblemType;
    alienAnimActive: boolean;
    setCorrectAnimActive: (val: boolean) => void;
}

export const AlienContainer = ({ alienRef, spriteRef, idx, problem, alienAnimActive, setCorrectAnimActive }: AlienContainerProps) => {
    const { resources } = useContext(ResourceContext);
    const { sec, comboActive, comboCnt, comboDestroyNum, animActive, setComboCnt, setInCorrectAnimActive, setAnimActive } = useContext(GameContext);
    const { handleIncorrectList } = useIncorrectList();
    const setAnswer = useSetRecoilState(answerCntState);

    const randomIdx = useMemo(() => {
        return Math.floor(Math.random() * 5) + 1;
    }, [problem]);

    const handleOnClickCorrect = () => {
        const alien = alienRef.current;
        const sprite = spriteRef.current;

        if (!alien || !sprite) return;

        setCorrectAnimActive(true);
        setAnimActive(true);

        if (comboActive) {
            setAnswer((prev) => ({ ...prev, combo: prev.combo + 1 }));
        } else {
            setAnswer((prev) => ({ ...prev, correct: prev.correct + 1 }));
        }

        sound.play("gameCorrect");

        alien.destroy();
        gsap.killTweensOf(sprite);
        spriteRef.current = null;

        if (comboCnt < MAX_COMBO_NUMBER) {
            setComboCnt((prev) => (prev += 1));
        }
    };

    const handleOnClickIncorrect = () => {
        handleIncorrectList();

        setInCorrectAnimActive(true);
        setAnimActive(true);
        sound.play("gameIncorrect");

        setAnswer((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
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
        if (comboDestroyNum === idx) {
            const alien = alienRef.current;
            const sprite = spriteRef.current;

            if (alien && sprite) {
                sound.play("alienDestroy");

                gsap.killTweensOf(sprite);
                alien.destroy();
                spriteRef.current = null;
            }
        }
    }, [comboDestroyNum, idx]);

    return (
        <Container ref={alienRef} interactive={!animActive && !alienAnimActive ? true : false} pointerdown={checkAnswer}>
            <Sprite ref={spriteRef} texture={resources[`alien0${randomIdx}`]} anchor={0.5} name={`alien0${idx + 1}`} />
            <Text name={`alienText0${idx + 1}`} text={problem.word} position={[0, 100]} style={ALIEN_TEXT_STYLE} anchor={0.5} />
        </Container>
    );
};
