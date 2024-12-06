import React, { useEffect, useState } from "react";
import { Layout } from "./Layout";
import { Intro } from "./Intro";
import { Loading } from "./Loading";
import { useRecoilState } from "recoil";
import { actionState } from "../store/assetsStore";
import { Assets } from "pixi.js";
import { Resource } from "../types/resourcesType";
import { Actions } from "../types/actionsType";

export const Starwords = () => {
    const assetsList = require("../assets/GameAssets").default;

    const [resources, setResources] = useState<Resource | null>(null);
    const [action, setAction] = useRecoilState(actionState);

    const loadAssets = async () => {
        const assets = assetsList.map((asset: { alias: string; src: string }) => ({
            alias: asset.alias,
            src: require(`../assets/${asset.src}`),
        }));

        const res = await Assets.load(assets);
        setResources(res);
        setAction(Actions.INTRO);
    };

    useEffect(() => {
        if (action === "INIT") {
            loadAssets();
        }
    }, [action]);

    return (
        <div>
            <Layout title='starwords'>{action === "INTRO" ? <Intro resources={resources} /> : <Loading />}</Layout>
        </div>
    );
};
