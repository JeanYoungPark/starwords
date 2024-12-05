import { Container, Sprite } from "@pixi/react";
import React from "react";
import { assetsResourcesState } from "../store/assetsStore";
import { useRecoilValue } from "recoil";

export const Intro = () => {
    const resources = useRecoilValue(assetsResourcesState);

    if (!resources) return null;

    return <Container>{resources && <Sprite name='bg' texture={resources.bg.texture} position={[-400, 0]} />}</Container>;
};
