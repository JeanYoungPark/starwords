import React, { useState } from "react";

export type AssetsTypes = {
    name: string;
    url: string;
    noRequired?: boolean | undefined;
};

export const useAssets = () => {
    const [loadComplete, setLoadComplete] = useState<boolean>(false);

    const data = require("../assets");
    console.log(data);
    const loadStart = (assets: AssetsTypes[]) => {
        const data = require("../assets");
        // assets.forEach((asset) => {
        //     const data = require('../assets');
        //     console.log(data);
        // });
    };
    return { loadStart, loadComplete };
};
