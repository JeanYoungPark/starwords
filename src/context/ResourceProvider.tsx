import { ReactNode, useEffect } from "react";
import { ResourceContext } from "./ResourceContext";
import { useStarwords } from "../hooks/useStarwords";
import { useSetRecoilState } from "recoil";
import { deviceOsState, gameTypeState } from "../store/assetsStore";
import { getCookie } from "../util";
import { soundMuteState } from "../store/gameStore";

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
    const { resources, gameData, contentsData } = useStarwords();
    const setDeviceOs = useSetRecoilState(deviceOsState);
    const setGameType = useSetRecoilState(gameTypeState);
    const setSoundMuteState = useSetRecoilState(soundMuteState);

    const getCookieAndSet = () => {
        const os = getCookie("device_os");
        setDeviceOs(os);
        setSoundMuteState(os === "iOS" ? false : true);

        const gameType = getCookie("game_type");
        setGameType(gameType);
    };

    useEffect(() => {
        getCookieAndSet();
    }, []);

    return <ResourceContext.Provider value={{ resources, gameData, contentsData }}>{children}</ResourceContext.Provider>;
};
