import { useContext } from "react";
import { Container, Sprite } from "@pixi/react";
import { ResourceContext } from "../context/ResourceContext";
import { Title } from "./intro/Title";
import { BgmBtn } from "./intro/BgmBtn";
import { HelpBtn } from "./common/HelpBtn";
import { StartBtn } from "./intro/StartBtn";
import { RankingBtn } from "./intro/RankingBtn";
import { useRecoilValue } from "recoil";
import { gameTypeState } from "../store/assetsStore";

export const Intro = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const gameType = useRecoilValue(gameTypeState);

    if (!resources || !sounds) return null;

    return (
        <Container>
            <Sprite name='bg' texture={resources.bg} anchor={0.5} position={[1024, 640]} />

            <Sprite name='bottomLight' texture={resources.bottomLight} position={[100, 550]} />
            <Sprite name='topLight' texture={resources.topLight} position={[200, 0]} />
            <Sprite name='planet01' texture={resources.planet01} position={[-150, 0]} scale={0.9} />
            <Sprite name='planet02' texture={resources.planet02} position={[1130, 350]} scale={0.9} />
            <Sprite name='rocket' texture={resources.rocket} position={[1400, 200]} />
            <Sprite name='spaceship' texture={resources.spaceship} position={[-10, 550]} scale={0.9} />

            <BgmBtn />
            <HelpBtn />

            <Title />
            <StartBtn />
            {gameType !== "word_master" && <RankingBtn />}
        </Container>
    );
};
