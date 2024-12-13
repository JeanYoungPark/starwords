import { ReactNode, useEffect, useState } from "react";
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
    const { assets, audioAssets } = require("../assets/GameAssets").default;

    const [resources, setResources] = useState<any>();
    const [sounds, setSounds] = useState<any>();
    const [action, setAction] = useRecoilState(actionState);

    const loadAssets = async () => {
        const assetsList = assets.map((asset: { alias: string; src: string }) => ({
            alias: asset.alias,
            src: require(`../assets/${asset.src}`),
        }));

        const loadedTextures = await Assets.load(assetsList);

        const soundAssetsList = audioAssets.map((asset: { alias: string; src: string }) => ({
            alias: asset.alias,
            src: require(`../assets/${asset.src}`), // @pixi/sound로 mp3 로드
        }));

        try {
            Assets.addBundle("sounds", soundAssetsList);
            const loadedSound = await Assets.loadBundle("sounds");
            Object.fromEntries(Object.entries(loadedSound).map(([alias, asset]) => [alias, Sound.from(asset as any)]));

            setSounds(loadedSound);
        } catch (error) {
            console.error("Sound loading error:", error);
        }

        setResources(loadedTextures);

        setAction(Actions.INTRO);
    };

    useEffect(() => {
        if (action === "INIT") {
            loadAssets();
        }
    }, [action]);

    return <ResourceContext.Provider value={{ resources, sounds }}>{children}</ResourceContext.Provider>;
};
