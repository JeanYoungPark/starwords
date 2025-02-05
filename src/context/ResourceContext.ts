import { createContext } from "react";

interface ResourceContextType {
    createProblem: (gameData: any, contentData: any) => void;
    problems: any;
    resources: any;
    sounds: any;
    gameData: any;
    contentsData: any;
    userData: any;
}

export const ResourceContext = createContext<ResourceContextType>({
    createProblem: () => {},
    problems: null,
    resources: undefined,
    sounds: undefined,
    gameData: undefined,
    contentsData: undefined,
    userData: undefined,
});
