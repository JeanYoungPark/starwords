import { createContext } from "react";
import { AlienMovePositionType } from "../types/resourcesType";

interface ResourceContextType {
    resources: any;
    gameData: any;
    contentsData: any;
    aliensPosition: AlienMovePositionType[];
}

export const ResourceContext = createContext<ResourceContextType>({
    resources: undefined,
    gameData: undefined,
    contentsData: undefined,
    aliensPosition: [],
});
