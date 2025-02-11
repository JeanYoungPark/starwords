import { ReactNode, useEffect } from "react";
import { ResourceContext } from "./ResourceContext";
import { useStarwords } from "../hooks/useStarwords";

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
    const { createProblem, problems, resources, sounds, gameData, contentsData, userData } = useStarwords();

    useEffect(() => {
        if (!gameData || !contentsData) return;
        createProblem(gameData, contentsData);
    }, [gameData, contentsData]);

    return (
        <ResourceContext.Provider value={{ createProblem, problems, resources, sounds, gameData, contentsData, userData }}>
            {children}
        </ResourceContext.Provider>
    );
};
