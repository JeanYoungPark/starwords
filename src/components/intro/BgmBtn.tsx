import { useContext, useEffect, useState } from "react";
import { PixiButton } from "../PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { sound } from "@pixi/sound";
import { Sprite } from "@pixi/react";

export const BgmBtn = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const [active, setActive] = useState(false);

    const toggleSound = () => {
        sound.toggleMuteAll();
        setActive((prev) => !prev);
    };

    useEffect(() => {
        sounds["audioIntroBgm"].volume = 0.5;
        sounds["audioIntroBgm"].play({ loop: true });
    }, [sounds]);

    return (
        <>
            <PixiButton
                name='bgmBtn'
                position={[60, 70]}
                defaultTexture={resources.soundOn}
                toggle={{
                    active: true,
                    initToggle: true,
                    texture: resources.soundOff,
                    onToggle: toggleSound,
                }}
                align='LEFT'
            />
            <Sprite name='soundText' texture={resources.soundText} position={[40, 130]} scale={0.7} visible={active} />
        </>
    );
};
