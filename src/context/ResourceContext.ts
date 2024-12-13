import { createContext } from "react";

interface ResourceContextType {
    resources: any;
    sounds: any;
}

export const ResourceContext = createContext<ResourceContextType>({ resources: undefined, sounds: undefined });
