import { createContext } from "react";

interface ResourceContextType {
    resources: any;
    sounds: any;
    gameData: any;
    contentsData: any;
    userData: any;
}

export const ResourceContext = createContext<ResourceContextType>({
    resources: undefined,
    sounds: undefined,
    gameData: undefined,
    contentsData: undefined,
    userData: undefined,
});
