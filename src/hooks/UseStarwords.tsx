import { useEffect, useState } from "react";
import { Assets, Texture } from "pixi.js";
import FontFaceObserver from "fontfaceobserver";
import { useRecoilState, useSetRecoilState } from "recoil";
import { WordType } from "../types/resourcesType";
import { alienPositionState, problemIdxState } from "../store/gameStore";
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
    const [gameData, setGameData] = useState(undefined);
    const [contentsData, setContentsData] = useState(undefined);
    const setAliensMovePosition = useSetRecoilState(alienPositionState);

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

    const contentDataParse = ({ level }: { level: string }) => {
        if (level >= "LV06") {
            return [
                { x: -453, y: -75, direction_x: "left", direction_y: "top" },
                { x: 0, y: -75, direction_x: "center", direction_y: "top" },
                { x: 453, y: -75, direction_x: "right", direction_y: "top" },
                { x: -268, y: 214, direction_x: "left", direction_y: "bottom" },
                { x: 268, y: 214, direction_x: "right", direction_y: "bottom" },
            ];
        } else {
            return [
                { x: -268, y: -75, direction_x: "left", direction_y: "top" },
                { x: 268, y: -75, direction_x: "right", direction_y: "top" },
                { x: -268, y: 214, direction_x: "left", direction_y: "bottom" },
                { x: 268, y: 214, direction_x: "right", direction_y: "bottom" },
            ];
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
        if (!contentsRes.level_code) throw new Error("content data를 가져오지 못했습니다.");
        const aliensPosition = contentDataParse({ level: contentsRes.level_code });

        setAliensMovePosition(aliensPosition);
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
