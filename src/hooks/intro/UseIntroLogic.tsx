import { useContext, useEffect, useState } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { sound } from "@pixi/sound";
import { useRecoilState } from "recoil";
import { actionState } from "../../store/assetsStore";
import { Actions } from "../../types/actionsType";

export const UseIntroLogic = () => {
    const { sounds } = useContext(ResourceContext);
    const [action, setAction] = useRecoilState(actionState);
    const [active, setActive] = useState(false);

    const toggleSound = () => {
        sound.toggleMuteAll();
        setActive((prev) => !prev);
    };

    const handleStartGuide = () => {
        setAction(Actions.GUIDE);
    };

    const handleStart = () => {
        setAction(Actions.GAME);
    };

    const handleRanking = () => {
        setAction(Actions.RANKING);
    };

    useEffect(() => {
        sounds["audioIntroBgm"].play({ loop: true });
    }, [sounds]);

    return {
        active,
        toggleSound,
        handleStartGuide,
        handleStart,
        handleRanking,
    };
};
