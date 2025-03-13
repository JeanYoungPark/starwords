import { useContext, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { sound } from "@pixi/sound";
import { Sprite } from "@pixi/react";

import { PixiButton } from "../common/PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { BGM_BUTTON } from "../../constants/introConstants";
import { soundMuteState } from "../../store/gameStore";
import { langCodeState } from "../../store/assetsStore";

export const BgmBtn = () => {
    const { resources } = useContext(ResourceContext);
    const [soundState, setSoundState] = useRecoilState(soundMuteState);
    const langCode = useRecoilValue(langCodeState);

    const getTexture = () => {
        if(langCode === 'jp') return resources.soundTextJp;
        if(langCode === 'cn') return resources.soundTextCn;
        if(langCode === 'tw' || langCode === 'hk') return resources.soundTextTw;
        return resources.soundText;
    }

    const handleSoundToggle = () => {
        setSoundState((prev) => {
            const newState = !prev;

            if (newState) {
                sound.unmuteAll();
                sound.stop('audioIntroBgm');
                sound.play("audioIntroBgm", { loop: true, start: 0 });
            } else {
                sound.muteAll();
            }

            return newState;
        });
    };

    useEffect(() => {
        if(soundState){
            sound.stop('audioIntroBgm');
            sound.volume("audioIntroBgm", BGM_BUTTON.INITIAL_VOLUME);
            sound.play("audioIntroBgm", { loop: true, start: 0 });
        }else{
            sound.muteAll();
        }
    }, []);

    return (
        <>
            <PixiButton
                name='bgmBtn'
                position={[BGM_BUTTON.ICON.POSITION.x, BGM_BUTTON.ICON.POSITION.y]}
                defaultTexture={resources.soundOn}
                toggle={{
                    active: true,
                    initToggle: soundState,
                    texture: resources.soundOff,
                    onToggle: handleSoundToggle,
                }}
            />
            <Sprite
                name='soundText'
                texture={getTexture()}
                position={[BGM_BUTTON.TEXT.POSITION.x, BGM_BUTTON.TEXT.POSITION.y]}
                scale={BGM_BUTTON.TEXT.SCALE}
                visible={!soundState}
            />
        </>
    );
};
