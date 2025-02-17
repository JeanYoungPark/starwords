import { Container } from "@pixi/react";
import { useContext } from "react";
import { useRecoilValue } from "recoil";

import { ResourceContext } from "../context/ResourceContext";
import { actionState } from "../store/assetsStore";
import { Intro } from "./pages/Intro";
import { Guide } from "./pages/Guide";
import { Loading } from "./Loading";
import { PixiButton } from "./common/PixiButton";
import { Game } from "./pages/Game";
import { CONTENT_WIDTH } from "../constants/commonConstants";
import { GameFinish } from "./pages/GameFinish";
import { Ranking } from "./pages/Ranking";
import { GameProvider } from "../context/GameProvider";
import { IncorrectAnswers } from "./pages/IncorrectAnswers";

export const Layout = () => {
    const { resources, sounds, gameData, contentsData } = useContext(ResourceContext);
    const action = useRecoilValue(actionState);

    if (!resources || !sounds || !gameData || !contentsData) return <Loading />;

    return (
        <Container>
            <>
                {action === "INTRO" && <Intro />}
                {action === "GUIDE" && <Guide />}
                {action === "GAME_PLAY" && (
                    <GameProvider>
                        <Game />
                    </GameProvider>
                )}
                {action === "GAME_FINISH" && <GameFinish />}
                {action === "INCORRECT" && <IncorrectAnswers />}
                {action === "RANKING" && <Ranking />}

                {action !== "INCORRECT" && (
                    <PixiButton name='close' position={[CONTENT_WIDTH - 60, 70]} defaultTexture={resources.close} sound={sounds.audioIntoBtn} />
                )}
            </>
        </Container>
    );
};
