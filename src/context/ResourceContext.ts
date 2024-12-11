import { createContext } from "react";
import { Resource } from "../types/resourcesType";

export const ResourceContext = createContext<Resource | undefined>(undefined);
