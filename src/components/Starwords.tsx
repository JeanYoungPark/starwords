import React from "react";
import { Layout } from "./Layout";
import { Intro } from "./Intro";
import { Loading } from "./Loading";
import { useAssets } from "../hooks/useAssets";

export const Starwords = () => {
    const { loadComplete } = useAssets();

    return (
        <div>
            <Layout title='starwords'>{loadComplete ? <Intro /> : <Loading />}</Layout>
        </div>
    );
};
