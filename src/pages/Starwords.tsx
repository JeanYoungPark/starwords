import { RecoilRoot } from "recoil";
import { ResourceProvider } from "../context/ResourceProvider";
import { GameLayout } from "../components/GameLayout";
import { Layout } from "../components/Layout";

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
