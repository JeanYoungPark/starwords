import { useContext } from "react";
import { PixiButton } from "../common/PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { GameContext } from "../../context/GameContext";

export const ReloadBtn = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const { init } = useContext(GameContext);

    const onReload = () => {
        init();
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
