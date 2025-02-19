import { createContext } from "react";

interface ResourceContextType {
    resources: any;
    gameData: any;
    contentsData: any;
    userData: any;
}

export const ResourceContext = createContext<ResourceContextType>({
    resources: undefined,
    gameData: undefined,
    contentsData: undefined,
    userData: undefined,
});
