import { Container } from "@pixi/react";
import { useContext, useEffect } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { useRecoilValue } from "recoil";
import { actionState } from "../store/assetsStore";
import { Intro } from "./Intro";
import { Guide } from "./Guide";
import { Ranking } from "./Ranking";
import { Loading } from "./Loading";
import { PixiButton } from "./PixiButton";
import { Game } from "./Game";
import { GameFinish } from "./GameFinish";

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

                <PixiButton name='close' position={[1860, 70]} defaultTexture={resources.close} sound={sounds.audioIntoBtn} align='RIGHT' />
            </>
        </Container>
    );
};
