import { useContext } from "react";
import { PixiButton } from "../PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilState } from "recoil";
import { gameActionState } from "../../store/assetsStore";
import { GameActions } from "../../types/actionsType";
import { UseInit } from "../../hooks/UseInit";

export const ReloadBtn = () => {
    const { resources, sounds, createProblem, gameData, contentsData } = useContext(ResourceContext);
    const [, setGameAction] = useRecoilState(gameActionState);
    const { init } = UseInit();

    const onReload = () => {
        init();
        setGameAction(GameActions.STAND_BY);
        createProblem(gameData, contentsData);
    };

    return (
        <PixiButton
            name='reload'
            position={[60, 70]}
            defaultTexture={resources.reload}
            sound={sounds.audioIntoBtn}
            align='LEFT'
            interactive={true}
            onclick={onReload}
        />
    );
};
