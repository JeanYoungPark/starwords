import { createContext } from "react";
import { AlienMovePositionType } from "../types/resourcesType";

interface ResourceContextType {
    resources: any;
    sounds: any;
    gameData: any;
    contentsData: any;
    userData: any;
    aliensMovePosition: AlienMovePositionType[] | undefined;
}

export const ResourceContext = createContext<ResourceContextType>({
    resources: undefined,
    sounds: undefined,
    gameData: undefined,
    contentsData: undefined,
    userData: undefined,
    aliensMovePosition: undefined,
});
