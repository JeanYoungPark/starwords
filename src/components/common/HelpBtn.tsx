import { useContext } from "react";
import { PixiButton } from "../PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilState } from "recoil";
import { actionState } from "../../store/assetsStore";
import { Actions } from "../../types/actionsType";

export const HelpBtn = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const [, setAction] = useRecoilState(actionState);

    const handleStartGuide = () => {
        setAction(Actions.GUIDE);
    };

    return (
        <PixiButton position={[1860, 1020]} defaultTexture={resources.help} sound={sounds.audioIntoBtn} align='RIGHT' onTouchEnd={handleStartGuide} />
    );
};
