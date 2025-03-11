import { ReactNode, useEffect, useState } from "react";
import { ResourceContext } from "./ResourceContext";
import { useStarwords } from "../hooks/useStarwords";
import { useSetRecoilState } from "recoil";
import { deviceOsState, gameTypeState, langCodeState } from "../store/assetsStore";
import { alienPositionParse, getCookie } from "../util";
import { isTestState, soundMuteState } from "../store/gameStore";
import { AlienMovePositionType, LangCodeType } from "../types/resourcesType";

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
    const { resources, gameData, contentsData } = useStarwords();
    const setDeviceOs = useSetRecoilState(deviceOsState);
    const setGameType = useSetRecoilState(gameTypeState);
    const setLangCode = useSetRecoilState(langCodeState);
    const setSoundMuteState = useSetRecoilState(soundMuteState);
    const setIsTest = useSetRecoilState(isTestState);
    const [aliensPosition, setAliensPosition] = useState<AlienMovePositionType[]>([]);

    const getCookieAndSet = () => {
        const os = getCookie("device_os");
        setDeviceOs(os);
        setSoundMuteState(os === "iOS" ? false : true);

        const gameType = getCookie("game_type");
        setGameType(gameType);

        const langCode = getCookie("lang_code") as LangCodeType;
        setLangCode(langCode);

        const isTest = getCookie("is_test");
        setIsTest(isTest === 'Y');
    };

    const defineAlienPosition = () => {
        const aliensPosition = alienPositionParse({ level: contentsData.level_code });
        setAliensPosition(aliensPosition);
    }

    useEffect(() => {
        getCookieAndSet();
    }, []);

    useEffect(() => {
        if(contentsData?.level_code) {
            defineAlienPosition();
        }
    }, [contentsData]);

    return <ResourceContext.Provider value={{ resources, gameData, contentsData, aliensPosition }}>{children}</ResourceContext.Provider>;
};
