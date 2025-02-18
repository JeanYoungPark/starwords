import { useContext, useEffect, useState } from "react";
import { sound } from "@pixi/sound";
import { Sprite } from "@pixi/react";

import { PixiButton } from "../common/PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { BGM_BUTTON } from "../../constants/introConstants";

export const BgmBtn = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const [active, setActive] = useState(false);

    const handleSoundToggle = () => {
        try {
            sound.toggleMuteAll();
            setActive((prev) => !prev);
        } catch (error) {
            console.error("Failed to toggle sound:", error);
        }
    };

    useEffect(() => {
        try {
            sounds.audioIntroBgm.volume = BGM_BUTTON.INITIAL_VOLUME;
            sounds.audioIntroBgm.play({ loop: true });
        } catch (error) {
            console.error("Failed to initialize BGM:", error);
        }

        return () => {
            if (sounds.audioIntroBgm) {
                sounds.audioIntroBgm.stop();
            }
        };
    }, [sounds]);

    return (
        <>
            <PixiButton
                name='bgmBtn'
                position={[BGM_BUTTON.ICON.POSITION.x, BGM_BUTTON.ICON.POSITION.y]}
                defaultTexture={resources.soundOn}
                toggle={{
                    active: true,
                    initToggle: true,
                    texture: resources.soundOff,
                    onToggle: handleSoundToggle,
                }}
            />
            <Sprite
                name='soundText'
                texture={resources.soundText}
                position={[BGM_BUTTON.TEXT.POSITION.x, BGM_BUTTON.TEXT.POSITION.y]}
                scale={BGM_BUTTON.TEXT.SCALE}
                visible={active}
            />
        </>
    );
};
