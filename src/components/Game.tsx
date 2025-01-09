import { Container, PixiRef, Sprite, Text } from "@pixi/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { PixiButton } from "./PixiButton";
import { TextStyle } from "pixi.js";
import { AlienMovePositionType } from "../types/resourcesType";
import { UseStarwords } from "../hooks/UseStarwords";
import { Alien } from "./Alien";
import { ScoreBar } from "./ScoreBar";

export const Game = () => {
    const { createProblem, problem } = UseStarwords();
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const { resources, sounds, gameData, contentsData, aliensMovePosition } = useContext(ResourceContext);
    const [alienState, setAlienState] = useState<string>("STANDBY");

    useEffect(() => {
        createProblem(gameData, contentsData);
    }, [gameData, contentsData]);

    const renderAliens = useCallback(() => {
        console.log(problem);

        return (
            <>
                {aliensMovePosition?.map((data: AlienMovePositionType, idx: number) => {
                    const randomIdx = Math.floor(Math.random() * 5) + 1;

                    return (
                        <Alien
                            key={`alien-${idx}-${problem?.item.word_en}`}
                            randomIdx={randomIdx}
                            idx={idx}
                            position={{ x: data.x, y: data.y }}
                            problem={problem}
                            createProblem={createProblem}
                        />
                    );
                })}
            </>
        );
    }, [problem]);

    return (
        <Container ref={containerRef}>
            <Sprite texture={resources.bg} anchor={0.5} position={[1024, 640]} />
            <Sprite texture={resources.gamePlanet01} position={[-50, 0]} />
            <Sprite texture={resources.gamePlanet02} position={[1500, 720]} />

            <PixiButton name='reload' position={[60, 70]} defaultTexture={resources.reload} sound={sounds.audioIntoBtn} align='LEFT' />

            <Text
                text={problem?.item.word_ko}
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
                {renderAliens()}
            </Container>

            <ScoreBar alienState={alienState} setAlienState={setAlienState} />
        </Container>
    );
};
