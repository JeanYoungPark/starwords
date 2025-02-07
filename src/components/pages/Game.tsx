import { AnimatedSprite, Container, PixiRef, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useRef, useState } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { Aliens } from "../game/Aliens";
import { ScoreBar } from "../game/ScoreBar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { comboDestroyNumberState, isComboState } from "../../store/gameStore";
import { ReloadBtn } from "../game/ReloadBtn";
import { PROBLEM_TEXT_STYLE } from "../../constants/gameConstants";
import { CONTENT_WIDTH } from "../../constants/commonConstants";

export const Game = () => {
    const { resources, sounds, gameData, contentsData, createProblem, problems } = useContext(ResourceContext);
    const isCombo = useRecoilValue(isComboState);
    const setComboDestroyNum = useSetRecoilState(comboDestroyNumberState);

    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
    const sec = useRef<number>(0);

    const INCORRECT_FRAMES = Array.from({ length: 8 }, (_, i) => resources[`incorrect0${i + 1}`]);

    useEffect(() => {
        sounds["audioIntroBgm"].stop();
        sounds["gameBgm"].play({ loop: true });
    }, [sounds]);

    const handleCorrect = () => {
        setIsIncorrect(false);
        createProblem(gameData, contentsData);

        if (!isCombo) {
            setComboDestroyNum(null);
        }
    };

    const handleIncorrect = () => {
        setIsIncorrect(true);
        sounds["gameIncorrect"].play();

        if (!isCombo) {
            setComboDestroyNum(null);
        }
    };

    return (
        <Container ref={containerRef}>
            <Sprite texture={resources.bg} anchor={0.5} position={[CONTENT_WIDTH / 2, 640]} />
            <Sprite texture={resources.gamePlanet01} position={[-50, 0]} />
            <Sprite texture={resources.gamePlanet02} position={[1500, 720]} />

            {isCombo && <Sprite texture={resources.gameComboBg} anchor={0.5} />}

            <ReloadBtn />

            <Text text={problems.item.word_ko} position={[CONTENT_WIDTH / 2, 180]} style={PROBLEM_TEXT_STYLE} anchor={0.5} />

            <Container position={[CONTENT_WIDTH / 2, 400]} scale={0.9} anchor={0.5}>
                <Aliens problems={problems} sec={sec} handleCorrect={handleCorrect} handleIncorrect={handleIncorrect} />

                {isIncorrect && (
                    <AnimatedSprite
                        textures={INCORRECT_FRAMES}
                        anchor={0.5}
                        isPlaying={true}
                        animationSpeed={0.2}
                        loop={false}
                        scale={1.5}
                        position={[0, 0]}
                        onComplete={() => {
                            setIsIncorrect(false);
                            createProblem(gameData, contentsData);
                        }}
                    />
                )}
            </Container>

            <ScoreBar sec={sec} handleIncorrect={handleIncorrect} />
        </Container>
    );
};
