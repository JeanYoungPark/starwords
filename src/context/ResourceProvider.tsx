import { ReactNode } from "react";
import { ResourceContext } from "./ResourceContext";
import { useStarwords } from "../hooks/useStarwords";

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
    const { createProblem, problems, resources, sounds, gameData, contentsData, userData } = useStarwords();

    return (
        <ResourceContext.Provider value={{ createProblem, problems, resources, sounds, gameData, contentsData, userData }}>
            {children}
        </ResourceContext.Provider>
    );
};
