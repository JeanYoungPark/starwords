import { ReactNode, useEffect, useState } from "react";
import { ResourceContext } from "./ResourceContext";
import { useRecoilState } from "recoil";
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
import { Assets } from "pixi.js";
import { Actions } from "../types/actionsType";
import { Sound } from "@pixi/sound";
import FontFaceObserver from "fontfaceobserver";
import { getGameData, getUserData, getContentsData } from "../apis/getData";
import { getCookie } from "../util";

interface ResourceProviderProps {
    children: ReactNode;
}

export const ResourceProvider = ({ children }: ResourceProviderProps) => {
    const { assets, audioAssets, fonts } = require("../assets/GameAssets").default;

    const [resources, setResources] = useState<any>();
    const [sounds, setSounds] = useState<any>();
    const [action, setAction] = useRecoilState(actionState);
    const [, setDeviceOs] = useRecoilState(deviceOsState);
    const [, setFuId] = useRecoilState(fuIdState);
    const [, setHwCode] = useRecoilState(hwCodeState);
    const [, setGameType] = useRecoilState(gameTypeState);
    const [, setWordMasterSeq] = useRecoilState(wordMasterSeqState);
    const [, setStage] = useRecoilState(stageState);
    const [, setLangCode] = useRecoilState(langCodeState);
    const [, setFcId] = useRecoilState(fcIdState);
    const [, setClassId] = useRecoilState(classIdState);
    const [gameData, setGameData] = useState(undefined);
    const [contentsData, setContentsData] = useState(undefined);
    const [userData, setUserData] = useState(undefined);

    const initData = async () => {
        setDeviceOs(getCookie("device_os"));
        setFuId(getCookie("fx7"));
        setHwCode(Number(getCookie("hw_no")));

        const gameType = getCookie("game_type");
        setGameType(gameType);

        if (gameType === "word_master") {
            setWordMasterSeq(getCookie("word_master_seq"));
            setStage(Number(getCookie("stage")));
            setLangCode(getCookie("lang_code"));
        } else {
            setFcId(getCookie("Starwords_fc_id"));

            if (gameType === "class_id") {
                setClassId(Number(getCookie("class_id")));
            }
        }
    };

    const loadData = async () => {
        const gameRes = await getGameData();
        if (gameRes.status === 200) {
            setGameData(gameRes.data);
        }

        const contentsRes = await getContentsData();
        if (contentsRes.status === 200) {
            setContentsData(contentsRes.data);
        }

        const userRes = await getUserData();
        if (userRes.status === 200) {
            setUserData(userRes.data);
        }
    };

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

    const loadAssets = async () => {
        await initData();
        await loadData();
        await loadFonts();

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

    return <ResourceContext.Provider value={{ resources, sounds, gameData, contentsData, userData }}>{children}</ResourceContext.Provider>;
};
