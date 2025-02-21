import { useContext } from "react";
import { useRecoilState } from "recoil";

import { PixiButton } from "../common/PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { actionState } from "../../store/assetsStore";
import { Actions } from "../../types/actionsType";
import { CONTENT_WIDTH } from "../../constants/commonConstants";
import { sound } from "@pixi/sound";

export const HelpBtn = () => {
    const { resources } = useContext(ResourceContext);
    const [, setAction] = useRecoilState(actionState);

    const handleStartGuide = () => {
        setAction(Actions.GUIDE);
    };

    return (
        <PixiButton
            position={[CONTENT_WIDTH - 60, 1020]}
            defaultTexture={resources.help}
            sound={sound.find("audioIntoBtn")}
            onTouchEnd={handleStartGuide}
        />
    );
};
