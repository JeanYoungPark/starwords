import { Container, Sprite } from "@pixi/react";
import { useContext } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { useRecoilValue } from "recoil";
import { actionState } from "../store/assetsStore";
import { Intro } from "./Intro";
import { Guide } from "./Guide";
import { Ranking } from "./Ranking";
import { Loading } from "./Loading";
import { PixiButton } from "./PixiButton";
import { Game } from "./Game";

export const Layout = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const action = useRecoilValue(actionState);

    return (
        <Container>
            {resources ? (
                <>
                    {action === "INTRO" && <Intro />}
                    {action === "GUIDE" && <Guide />}
                    {action === "RANKING" && <Ranking />}
                    {action === "GAME_START" && <Game />}

                    <PixiButton name='close' position={[1860, 70]} defaultTexture={resources.close} sound={sounds.audioIntoBtn} align='RIGHT' />
                </>
            ) : (
                <Loading />
            )}
        </Container>
    );
};
