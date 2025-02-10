import { useEffect, useState } from "react";
import { ProblemType, WordType } from "../types/resourcesType";
import { useRecoilState, useRecoilValue } from "recoil";
import { alienPositionState } from "../store/gameStore";
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

export const UseStarwords = () => {
    const { assets, audioAssets, fonts } = require("../assets/GameAssets").default;

    // get from cookies
    const [, setDeviceOs] = useRecoilState(deviceOsState);
    const [, setFuId] = useRecoilState(fuIdState);
    const [, setHwCode] = useRecoilState(hwCodeState);
    const [, setGameType] = useRecoilState(gameTypeState);
    const [, setWordMasterSeq] = useRecoilState(wordMasterSeqState);
    const [, setStage] = useRecoilState(stageState);
    const [, setLangCode] = useRecoilState(langCodeState);
    const [, setFcId] = useRecoilState(fcIdState);
    const [, setClassId] = useRecoilState(classIdState);
    const [action, setAction] = useRecoilState(actionState);

    const gameType = useRecoilValue(gameTypeState);

    const [idx, setIdx] = useState(-1);
    const [resources, setResources] = useState<any>();
    const [sounds, setSounds] = useState<any>();
    const [gameData, setGameData] = useState(undefined);
    const [contentsData, setContentsData] = useState(undefined);
    const [userData, setUserData] = useState(undefined);
    const [, setAliensMovePosition] = useRecoilState(alienPositionState);

    const [problems, setProblems] = useState<
        | {
              item: WordType;
              aliens: ProblemType[];
          }
        | undefined
    >(undefined);

    const getCookieData = async () => {
        setDeviceOs(getCookie("device_os"));
        setFuId(getCookie("fx7"));
        setHwCode(Number(getCookie("hw_no")));

        const cookieGameType = getCookie("game_type");
        setGameType(cookieGameType);

        if (cookieGameType === "word_master") {
            setWordMasterSeq(getCookie("word_master_seq"));
            setStage(Number(getCookie("stage")));
            setLangCode(getCookie("lang_code"));
        } else {
            setFcId(getCookie("Starwords_fc_id"));

            if (cookieGameType === "class_id") {
                setClassId(Number(getCookie("class_id")));
            }
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

    // const setContentInfo = () => {};

    const gameDataParse = (data: any) => {
        // setLeftTime(data.time_limit + 1);
        setIdx(-1);
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

    const contentDataParse = (data: any) => {
        if (data.level_code >= "LV06") {
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
        const aliensPosition = contentDataParse(contentsRes);
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

    const createProblem = (gameData: any, contentData: any) => {
        //combo 상태일때는 문제 3개만 노출
        const nextIdx = idx + 1;
        setIdx(nextIdx);

        if (nextIdx >= gameData.length) {
            setIdx(0);
        }

        const alienCnt = contentData.level_code >= "LV06" ? 5 : 4;

        let aliens: ProblemType[] = [];
        let i = 0;
        let breakCnt = 0;

        // 오답 만들기
        while (aliens.length < alienCnt) {
            // 무한루프 방지
            breakCnt++;
            if (breakCnt > 50) break;

            // 오답 리스트중 한개 랜덤으로 선택
            let rand_word = gameData.wrong_word_arr[Math.floor(Math.random() * gameData.wrong_word_arr.length)].word_en;

            // 랜덤 오답 단어가 기존 오답과 동일하지 않고 정답 단어와도 동일하지 않은 경우
            if (
                !aliens.find((ele) => {
                    return ele.word === rand_word;
                }) &&
                !aliens.find((ele) => {
                    return ele.word === gameData.word_arr[nextIdx].word_en;
                })
            ) {
                // 오답 리스트에 추가
                aliens[i] = {
                    word: rand_word,
                    correct: "N",
                };

                i++;
            }
        }

        // 정답
        const correctRand = Math.floor(Math.random() * aliens.length);
        aliens[correctRand] = {
            word: gameData.word_arr[nextIdx].word_en,
            correct: "Y",
        };

        setProblems({
            item: gameData.word_arr[nextIdx],
            aliens: aliens,
        });
    };

    const loadGameData = async () => {
        await getCookieData();
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

    return { createProblem, problems, resources, sounds, gameData, contentsData, userData };
    // return { gameDataParse, createProblem, problem };
};
