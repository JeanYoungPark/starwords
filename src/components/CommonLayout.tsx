import { useRecoilValue } from "recoil";
import { actionState } from "../store/assetsStore";
import { Intro } from "./Intro";
import { Loading } from "./Loading";
import { GameLayout } from "./GameLayout";

export const CommonLayout = () => {
    const action = useRecoilValue(actionState);

    return (
        <>
            {action === "INTRO" ? (
                <GameLayout>
                    <Intro />
                </GameLayout>
            ) : (
                <Loading />
            )}
        </>
    );
};
