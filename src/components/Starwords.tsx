import { RecoilRoot } from "recoil";
import { ResourceProvider } from "../context/ResourceProvider";
import { GameLayout } from "./GameLayout";
import { useState } from "react";
import { Layout } from "./Layout";

export const Starwords = () => {
    return (
        <GameLayout title='starwords'>
            <RecoilRoot>
                <ResourceProvider>
                    <Layout />
                </ResourceProvider>
            </RecoilRoot>
        </GameLayout>
    );
};
