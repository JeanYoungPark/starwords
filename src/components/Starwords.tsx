import React, { useEffect } from "react";
import { Layout } from "./Layout";
import { Intro } from "./Intro";
import { Loading } from "./Loading";
import { useRecoilState } from "recoil";
import { assetsLoadState, assetsResourcesState } from "../store/assetsStore";
import { Assets } from "pixi.js";

export const Starwords = () => {
    const assetsList = require("../assets/GameAssets").default;

    const [resources, setResources] = useRecoilState(assetsResourcesState);
    const [isLoaded, setIsLoaded] = useRecoilState(assetsLoadState);

    const loadAssets = async () => {
        const assets = assetsList.map((asset: { alias: string; src: string }) => ({
            alias: asset.alias,
            src: require(`../assets/${asset.src}`),
        }));

        const res = await Assets.load(assets);
        setResources(res);
        setIsLoaded(true);
    };

    useEffect(() => {
        loadAssets();
    }, []);

    return (
        <div>
            <Layout title='starwords'>{isLoaded ? <Intro /> : <Loading />}</Layout>
        </div>
    );
};
