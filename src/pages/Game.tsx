import { Container, PixiRef, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useRef } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { ScoreBar } from "../components/game/ScoreBar";
import { ReloadBtn } from "../components/game/ReloadBtn";
import { PROBLEM_TEXT_STYLE } from "../constants/gameConstants";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../constants/commonConstants";
import { Aliens } from "../components/game/Aliens";
import { GameContext } from "../context/GameContext";
import { InCorrectAnim } from "../components/game/InCorrectAnim";
import { useRecoilState } from "recoil";
import { AlienActionState } from "../store/assetsStore";
import { AlienActions } from "../types/actionsType";
import { sound } from "@pixi/sound";
import { AutosizeText } from "../components/common/AutosizeText";


export const Game = () => {
    const { resources, gameData, contentsData } = useContext(ResourceContext);
    const { comboActive, inCorrectAnimActive, problems, createProblem } = useContext(GameContext);

    const [alienAction, setAlienAction] = useRecoilState(AlienActionState);
    const containerRef = useRef<PixiRef<typeof Container>>(null);

    useEffect(() => {
        sound.stop("audioIntroBgm");
        sound.play("gameBgm", { loop: true, start: 0 });
    }, []);

    useEffect(() => {
        if (alienAction === AlienActions.STAND_BY) {
            createProblem(gameData, contentsData);
            setAlienAction(AlienActions.PLAYING);
        }
    }, [alienAction]);

    if (!problems) return null;

    return (
        <Container ref={containerRef}>
            <Sprite texture={resources.bg} anchor={0.5} position={[CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2]} />
            <Sprite texture={resources.gamePlanet01} position={[-50, 0]} />
            <Sprite texture={resources.gamePlanet02} position={[1500, 720]} />

            {comboActive && <Sprite texture={resources.gameComboBg} anchor={0.5} position={[CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2]} />}

            <ReloadBtn />

            <AutosizeText
                text={problems.item.word_ko}
                maxWidth={CONTENT_WIDTH - 400}
                position={[CONTENT_WIDTH / 2, 160]}
                style={PROBLEM_TEXT_STYLE}
                anchor={0.5}
            />

            <Container position={[CONTENT_WIDTH / 2, 400]} scale={0.9} anchor={0.5}>
                <Aliens problems={problems} />
                {inCorrectAnimActive && <InCorrectAnim />}
            </Container>

            <ScoreBar />
        </Container>
    );
};
