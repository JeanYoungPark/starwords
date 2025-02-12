import { useContext } from "react";
import { useSetRecoilState } from "recoil";

import { PixiButton } from "../common/PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { gameActionState } from "../../store/assetsStore";
import { GameActions } from "../../types/actionsType";
import { useInit } from "../../hooks/useInit";

export const ReloadBtn = () => {
    const { resources, sounds, createProblem, gameData, contentsData } = useContext(ResourceContext);
    const setGameAction = useSetRecoilState(gameActionState);
    const { init } = useInit();

    const onReload = () => {
        init();
        setGameAction(GameActions.STAND_BY);
        // createProblem(gameData, contentsData);
    };

    return (
        <PixiButton
            name='reload'
            position={[60, 70]}
            defaultTexture={resources.reload}
            sound={sounds.audioIntoBtn}
            interactive={true}
            onclick={onReload}
        />
    );
};
