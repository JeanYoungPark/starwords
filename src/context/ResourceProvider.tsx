import { ReactNode } from "react";
import { ResourceContext } from "./ResourceContext";
import { useStarwords } from "../hooks/useStarwords";

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
    const { resources, sounds, gameData, contentsData, userData } = useStarwords();

    return <ResourceContext.Provider value={{ resources, sounds, gameData, contentsData, userData }}>{children}</ResourceContext.Provider>;
};
