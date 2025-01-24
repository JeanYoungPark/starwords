import { RecoilRoot } from "recoil";
import { ResourceProvider } from "../context/ResourceProvider";
import { GameLayout } from "./GameLayout";
import { useState } from "react";
import { Layout } from "./Layout";

export const Starwords = () => {
    // TODO: 결과 데이터에 따라 타입 수정
    const [resultPopupData, setResultPopupData] = useState<any>(null);

    return (
        <GameLayout title='starwords' resultPopupData={resultPopupData}>
            <RecoilRoot>
                <ResourceProvider>
                    <Layout />
                </ResourceProvider>
            </RecoilRoot>
        </GameLayout>
    );
};
