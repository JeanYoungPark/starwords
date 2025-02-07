import { AnimatedSprite, Container, PixiRef, Sprite, Text } from "@pixi/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { TextStyle } from "pixi.js";
import { Aliens } from "../game/Alien";
import { ScoreBar } from "../game/ScoreBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { comboDestroyNumberState, isComboState } from "../../store/gameStore";
import { ReloadBtn } from "../game/ReloadBtn";

export const Game = () => {
    const isCombo = useRecoilValue(isComboState);
    const [comboDestroyNum, setComboDestroyNum] = useRecoilState(comboDestroyNumberState);
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const { resources, sounds, gameData, contentsData, createProblem, problems } = useContext(ResourceContext);
    const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
    const sec = useRef<number>(0);

    const incorrect = [
        resources.incorrect01,
        resources.incorrect02,
        resources.incorrect03,
        resources.incorrect04,
        resources.incorrect05,
        resources.incorrect06,
        resources.incorrect07,
        resources.incorrect08,
    ];

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

    const handleIncorrect = useCallback(() => {
        setIsIncorrect(true);
        sounds["gameIncorrect"].play();

        if (!isCombo) {
            setComboDestroyNum(null);
        }
    }, [sounds]);

    return (
        <Container ref={containerRef}>
            <Sprite texture={resources.bg} anchor={0.5} position={[1024, 640]} />
            <Sprite texture={resources.gamePlanet01} position={[-50, 0]} />
            <Sprite texture={resources.gamePlanet02} position={[1500, 720]} />

            {isCombo && <Sprite texture={resources.gameComboBg} />}
            <ReloadBtn />

            <Text
                text={problems?.item.word_ko}
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

            <Container position={[1920 / 2, 400]} name='alien' scale={0.9}>
                <Aliens problems={problems} sec={sec} handleCorrect={handleCorrect} handleIncorrect={handleIncorrect} />
                {isIncorrect && (
                    <AnimatedSprite
                        textures={incorrect}
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
