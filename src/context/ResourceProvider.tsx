import React, { ReactNode, useEffect, useState } from "react";
import { ResourceContext } from "./ResourceContext";
import { useRecoilState } from "recoil";
import { actionState } from "../store/assetsStore";
import { Assets } from "pixi.js";
import { Actions } from "../types/actionsType";
import { Sound } from "@pixi/sound";

interface ResourceProviderProps {
    children: ReactNode;
}
export const ResourceProvider = ({ children }: ResourceProviderProps) => {
    const assetsList = require("../assets/GameAssets").default;

    const [resources, setResources] = useState<any>();
    const [action, setAction] = useRecoilState(actionState);

    const loadAssets = async () => {
        const assets = assetsList.map((asset: { alias: string; src: string }) => {
            if (asset.src.endsWith(".mp3")) {
                return {
                    alias: asset.alias,
                    src: Sound.from(require(`../assets/${asset.src}`)), // @pixi/sound로 mp3 로드
                };
            } else {
                return {
                    alias: asset.alias,
                    src: require(`../assets/${asset.src}`),
                };
            }
        });

        const imageAssets = assets.filter((asset: { alias: string; src: string }) => typeof asset.src !== "object");
        const loadedTextures = await Assets.load(imageAssets);

        const soundAssets = assets.filter((asset: { alias: string; src: object }) => typeof asset.src === "object");

        const res = {
            ...loadedTextures,
            ...Object.fromEntries(soundAssets.map((asset: { alias: string; src: object }) => [asset.alias, asset.src])),
        };

        setResources(res);
        setAction(Actions.INTRO);
    };

    useEffect(() => {
        if (action === "INIT") {
            loadAssets();
        }
    }, [action]);

    return <ResourceContext.Provider value={resources}>{children}</ResourceContext.Provider>;
};
