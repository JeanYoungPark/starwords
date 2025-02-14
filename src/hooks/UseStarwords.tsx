import { useEffect, useState } from "react";
import { WordType } from "../types/resourcesType";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { alienPositionState, problemIdxState } from "../store/gameStore";
import { getCookie } from "../util";
import {
    actionState,
    classIdState,
    deviceOsState,
    fcIdState,
    fuIdState,
    gameTypeState,
    hwCodeState,
    langCodeState,
    stageState,
    wordMasterSeqState,
} from "../store/assetsStore";
import { getContentsData, getGameData, getUserData } from "../apis/getData";
import { Assets } from "pixi.js";
import FontFaceObserver from "fontfaceobserver";
import { Actions } from "../types/actionsType";

export const useStarwords = () => {
    const { assets, audioAssets, fonts } = require("../assets/GameAssets").default;

    // get from cookies
    const setDeviceOs = useSetRecoilState(deviceOsState);
    const setFuId = useSetRecoilState(fuIdState);
    const setHwCode = useSetRecoilState(hwCodeState);
    const setGameType = useSetRecoilState(gameTypeState);
    const setWordMasterSeq = useSetRecoilState(wordMasterSeqState);
    const setStage = useSetRecoilState(stageState);
    const setLangCode = useSetRecoilState(langCodeState);
    const setFcId = useSetRecoilState(fcIdState);
    const setClassId = useSetRecoilState(classIdState);
    const [action, setAction] = useRecoilState(actionState);

    const gameType = useRecoilValue(gameTypeState);
    const setProblemIdx = useSetRecoilState(problemIdxState);

    const [resources, setResources] = useState<any>();
    const [sounds, setSounds] = useState<any>();
    const [gameData, setGameData] = useState(undefined);
    const [contentsData, setContentsData] = useState(undefined);
    const [userData, setUserData] = useState(undefined);
    const setAliensMovePosition = useSetRecoilState(alienPositionState);

    const loadFonts = async () => {
        const fontPromises = fonts.map((font: { family: string; url: string }) => {
            // 폰트 face 정의
            const fontFace = new FontFace(font.family, `url(${require(`../assets/${font.url}`)}`);

            // 폰트를 document fonts에 추가
            return fontFace.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
                return new FontFaceObserver(font.family).load();
            });
        });

        try {
            await Promise.all(fontPromises);
            console.log("All fonts loaded successfully");
        } catch (error) {
            console.error("Font loading error:", error);
        }
    };

    // const setContentInfo = () => {};

    const gameDataParse = (data: any) => {
        // setLeftTime(data.time_limit + 1);
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
            console.log("gameData.word_arr:", gameRes.word_arr);
            console.log("gameData.word_arr:", gameRes.wrong_word_arr);
            setGameData(gameRes);
        }

        // content data
        const contentsRes = await getContentsData();
        if (!contentsRes.level_code) throw new Error("content data를 가져오지 못했습니다.");
        const aliensPosition = contentDataParse({ level: contentsRes.level_code });

        setAliensMovePosition(aliensPosition);

        // contentsRes.title_len = contentsRes.cont_title.length;
        setContentsData(contentsRes);

        // etc
        if (gameType === "class" || gameType === "normal") {
            const userRes = await getUserData();
            if (userRes.status === 200) {
                setUserData(userRes.data);
            }
        }
    };

    const loadAssets = async () => {
        try {
            const imageAssets = new Map(
                assets.map((asset: { alias: string; src: string }) => [asset.alias, { alias: asset.alias, src: require(`../assets/${asset.src}`) }])
            );

            const soundAssetsList = new Map(
                audioAssets.map((asset: { alias: string; src: string }) => [
                    asset.alias,
                    { alias: asset.alias, src: require(`../assets/${asset.src}`) },
                ])
            );

            const [loadedTextures, loadedSounds] = await Promise.all([
                Assets.load(Array.from(imageAssets.values())),
                Assets.load(Array.from(soundAssetsList.values())),
            ]);

            setResources(loadedTextures);
            setSounds(loadedSounds);
        } catch (error) {
            console.error("Sound loading error:", error);
        }
    };

    const loadGameData = async () => {
        // await getCookieData();
        await loadFonts();
        await loadData();
        await loadAssets();

        setAction(Actions.INTRO);
    };

    useEffect(() => {
        if (action === "INIT") {
            loadGameData();
        }
    }, []);

    return { resources, sounds, gameData, contentsData, userData };
};
