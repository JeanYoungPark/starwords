import { Container, PixiRef, Sprite } from "@pixi/react";
import React, { useContext, useEffect, useRef } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { useRecoilState } from "recoil";
import { actionState } from "../store/assetsStore";
import { Actions } from "../types/actionsType";

export const GameFinish = () => {
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const { resources, sounds } = useContext(ResourceContext);
    const [actions, setActions] = useRecoilState(actionState);

    useEffect(() => {
        sounds["gameBgm"].stop();
        sounds["result"].play();
    }, []);

    return (
        <Container ref={containerRef}>
            <Sprite texture={resources.bg} anchor={0.5} position={[1024, 640]} />
            <Sprite texture={resources.gamePlanet01} position={[-50, 0]} />
            <Sprite texture={resources.gamePlanet02} position={[1500, 720]} />

            <Container position={[960, 650]}>
                <Sprite texture={resources.resultBg} anchor={0.5} position={[0, 0]} scale={0.8} />
                <Sprite texture={resources.incorrectBtn} anchor={0.5} scale={0.8} position={[-300, 200]} />
                <Sprite texture={resources.resultRankingBtn01} anchor={0.5} scale={0.8} position={[105, 200]} />
                <Sprite texture={resources.resultTryAgainBtn01} anchor={0.5} scale={0.8} position={[400, 200]} />
                {/* <Sprite texture={resources.resultRankingBtn01} anchor={0.5} scale={0.8} position={[-300, 200]} />
                <Sprite texture={resources.resultTryAgainBtn01} anchor={0.5} position={[0, 0]} /> */}
            </Container>
            <Sprite texture={resources.tryAgain} anchor={0.5} position={[1920 / 2, 150]} scale={0.8} />
        </Container>
    );
};
