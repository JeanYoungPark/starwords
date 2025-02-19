import { ReactNode, useEffect } from "react";
import { ResourceContext } from "./ResourceContext";
import { useStarwords } from "../hooks/useStarwords";
import { useSetRecoilState } from "recoil";
import { deviceOsState } from "../store/assetsStore";
import { getCookie } from "../util";
import { soundMuteState } from "../store/gameStore";

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
    const { resources, gameData, contentsData, userData } = useStarwords();
    const setDeviceOs = useSetRecoilState(deviceOsState);
    const setSoundMuteState = useSetRecoilState(soundMuteState);

    useEffect(() => {
        const os = getCookie("device_os");
        setDeviceOs(os);
        setSoundMuteState(os === "iOS" ? false : true);
    }, []);

    return <ResourceContext.Provider value={{ resources, gameData, contentsData, userData }}>{children}</ResourceContext.Provider>;
};
