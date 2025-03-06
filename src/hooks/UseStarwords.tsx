import { useEffect, useState } from "react";
import { Assets, Texture } from "pixi.js";
import FontFaceObserver from "fontfaceobserver";
import { useRecoilState, useSetRecoilState } from "recoil";
import { WordType } from "../types/resourcesType";
import { problemIdxState } from "../store/gameStore";
import { actionState } from "../store/assetsStore";
import { getContentsData, getGameData } from "../apis/getData";
import { Actions } from "../types/actionsType";
import { initGame } from "../util/interface";
import { getCookie } from "../util";

export const useStarwords = () => {
    const { assets, audioAssets, fonts } = require("../assets/GameAssets").default;
    const [action, setAction] = useRecoilState(actionState);

    const setProblemIdx = useSetRecoilState(problemIdxState);

    const [resources, setResources] = useState<Texture>();
    const [gameData, setGameData] = useState<any>(undefined);
    const [contentsData, setContentsData] = useState<any>([undefined]);

    const loadFonts = async () => {
        fonts.map((font: { family: string; url: string }) => {
            // 폰트 face 정의
            const fontFace = new FontFace(font.family, `url(${require(`../assets/${font.url}`)}`);

            // 폰트를 document fonts에 추가
            return fontFace.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
                return new FontFaceObserver(font.family).load();
            });
        });
    };

    const gameDataParse = (data: any) => {
        setProblemIdx(-1);
        return shuffleWord(data.word_arr);
    };

    const shuffleWord = (data: WordType[]) => {
        if (data.length > 0) {
            for (var i = data.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }

            return data;
        }
    };

    const loadData = async () => {
        // game data
        const gameRes = await getGameData();
        
        if (gameRes.code === 200) {
            gameRes.leftTime = gameRes.time_limit + 1;
            gameRes.idx = -1;

            const shuffleGameData = gameDataParse(gameRes);
            gameRes.word_arr = shuffleGameData;
            setGameData(gameRes);
        }

        // content data
        const contentsRes = await getContentsData();
        setContentsData(contentsRes);
    };

    const loadAssets = async () => {
        const imageAssets = new Map(
            assets.map((asset: { alias: string; src: string }) => [asset.alias, { alias: asset.alias, src: require(`../assets/${asset.src}`) }])
        );

        const soundAssetsList = new Map(
            audioAssets.map((asset: { alias: string; src: string }) => [asset.alias, { alias: asset.alias, src: require(`../assets/${asset.src}`) }])
        );

        const [loadedTextures] = await Promise.all([
            Assets.load(Array.from(imageAssets.values())),
            Assets.load(Array.from(soundAssetsList.values())),
        ]);

        setResources(loadedTextures);
    };

    const loadGameData = async () => {
        await loadFonts();
        await loadData();
        await loadAssets();
    };

    const init = async () => {
        const os = getCookie("device_os");
        await loadGameData();
        os && initGame(os);
        setAction(Actions.INTRO);
    };

    useEffect(() => {
        if (action === "INIT") {
            init();
        }
    }, []);

    return { resources, gameData, contentsData };
};
