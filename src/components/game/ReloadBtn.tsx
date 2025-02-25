import { useContext } from "react";
import { PixiButton } from "../common/PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { GameContext } from "../../context/GameContext";
import { sound } from "@pixi/sound";
import { actionState } from "../../store/assetsStore";
import { Actions } from "../../types/actionsType";
import { useSetRecoilState } from "recoil";

export const ReloadBtn = () => {
    const { resources } = useContext(ResourceContext);
    const { init } = useContext(GameContext);

    const setActions = useSetRecoilState(actionState);

    const onReload = () => {
        setActions(Actions.GAME_PLAY);
        init();
    };

    return (
        <PixiButton
            name='reload'
            position={[60, 70]}
            defaultTexture={resources.reload}
            sound={sound.find("audioIntoBtn")}
            interactive={true}
            onTouchEnd={onReload}
        />
    );
};
