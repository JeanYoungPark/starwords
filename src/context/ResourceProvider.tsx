import { ReactNode, useEffect } from "react";
import { ResourceContext } from "./ResourceContext";
import { useStarwords } from "../hooks/useStarwords";
import { useSetRecoilState } from "recoil";
import { deviceOsState, gameTypeState, langCodeState } from "../store/assetsStore";
import { getCookie } from "../util";
import { isTestState, soundMuteState } from "../store/gameStore";

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
    const { resources, gameData, contentsData } = useStarwords();
    const setDeviceOs = useSetRecoilState(deviceOsState);
    const setGameType = useSetRecoilState(gameTypeState);
    const setLangCode = useSetRecoilState(langCodeState);
    const setSoundMuteState = useSetRecoilState(soundMuteState);
    const setIsTest = useSetRecoilState(isTestState);

    const getCookieAndSet = () => {
        const os = getCookie("device_os");
        setDeviceOs(os);
        setSoundMuteState(os === "iOS" ? false : true);

        const gameType = getCookie("game_type");
        setGameType(gameType);

        const langCode = getCookie("lang_code");
        setLangCode(langCode);

        const isTest = getCookie("is_test");
        setIsTest(isTest === 'Y');
    };

    useEffect(() => {
        getCookieAndSet();
    }, []);

    return <ResourceContext.Provider value={{ resources, gameData, contentsData }}>{children}</ResourceContext.Provider>;
};
