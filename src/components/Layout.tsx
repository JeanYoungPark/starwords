import { Container } from "@pixi/react";
import { useContext } from "react";
import { useRecoilValue } from "recoil";

import { ResourceContext } from "../context/ResourceContext";
import { actionState } from "../store/assetsStore";
import { Intro } from "../pages/Intro";
import { Guide } from "../pages/Guide";
import { Loading } from "./Loading";
import { PixiButton } from "./common/PixiButton";
import { Game } from "../pages/Game";
import { CONTENT_WIDTH } from "../constants/commonConstants";
import { GameResult } from "../pages/GameResult";
import { Ranking } from "../pages/Ranking";
import { GameProvider } from "../context/GameProvider";
import { IncorrectAnswers } from "../pages/IncorrectAnswers";
import { sound } from "@pixi/sound";
import { Actions } from "../types/actionsType";

export const Layout = () => {
    const { resources, gameData, contentsData } = useContext(ResourceContext);
    const action = useRecoilValue(actionState);

    if (!resources || !gameData || !contentsData) return <Loading />;

    return (
        <Container>
            <>
                {action === Actions.INTRO && <Intro />}
                {action === Actions.GUIDE && <Guide />}
                <GameProvider>
                    {action === Actions.GAME_PLAY && <Game />}
                    {action === Actions.GAME_FINISH && <GameResult />}
                </GameProvider>
                {action === Actions.INCORRECT && <IncorrectAnswers />}
                {((action === Actions.RANKING) || (action === Actions.RANKING_END)) && <Ranking />}

                {action !== Actions.INCORRECT && (
                    <PixiButton
                        name='close'
                        position={[CONTENT_WIDTH - 60, 70]}
                        defaultTexture={resources.close}
                        sound={sound.find("audioIntoBtn")}
                    />
                )}
            </>
        </Container>
    );
};
