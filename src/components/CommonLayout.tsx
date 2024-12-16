import { useRecoilValue } from "recoil";
import { actionState } from "../store/assetsStore";
import { Intro } from "./Intro";
import { Loading } from "./Loading";
import { GameLayout } from "./GameLayout";
import { Guide } from "./Guide";

export const CommonLayout = () => {
    const action = useRecoilValue(actionState);
    console.log(action);
    switch (action) {
        case "INTRO":
            return (
                <GameLayout>
                    <Intro />
                </GameLayout>
            );
        case "GUIDE":
            return (
                <GameLayout>
                    <Guide />
                </GameLayout>
            );
        default:
            return <Loading />;
    }
};
