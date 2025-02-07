import { Container } from "@pixi/react";
import { useContext, useEffect } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { useRecoilValue } from "recoil";
import { actionState } from "../store/assetsStore";
import { Intro } from "./Intro";
import { Guide } from "./Guide";
import { Ranking } from "./Ranking";
import { Loading } from "./Loading";
import { PixiButton } from "./common/PixiButton";
import { Game } from "./Game";
import { GameFinish } from "./GameFinish";
import { CONTENT_WIDTH } from "../constants/commonConstants";

export const Layout = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const action = useRecoilValue(actionState);

    if (!resources || !sounds) return <Loading />;

    return (
        <Container>
            <>
                {action === "INTRO" && <Intro />}
                {action === "GAME_PLAY" && <Game />}
                {action === "GAME_FINISH" && <GameFinish />}
                {action === "GUIDE" && <Guide />}
                {action === "RANKING" && <Ranking />}

                <PixiButton name='close' position={[CONTENT_WIDTH - 60, 70]} defaultTexture={resources.close} sound={sounds.audioIntoBtn} />
            </>
        </Container>
    );
};
