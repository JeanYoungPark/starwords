import { Container, Sprite } from "@pixi/react";
import { useContext } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ResourceContext } from "../context/ResourceContext";
import { PixiButton } from "../components/common/PixiButton";
import { actionState, gameTypeState, langCodeState } from "../store/assetsStore";
import { Actions } from "../types/actionsType";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../constants/commonConstants";
import { sound } from "@pixi/sound";

export const Guide = () => {
    const { resources } = useContext(ResourceContext);
    const setAction = useSetRecoilState(actionState);
    const langCode = useRecoilValue(langCodeState);
    const gameType = useRecoilValue(gameTypeState);

    const getTexture = () => {
        if(gameType === 'word_master'){
            if(langCode === 'jp') return resources.guideWordMasterJp;
            if(langCode === 'cn') return resources.guideWordMasterCn;
            if(langCode === 'tw' || langCode === 'hk') return resources.guideWordMasterTw;
            return resources.guideWordMaster;
        }else if(gameType === 'class') {
            return resources.guideClass;
        }else{
            if(langCode === 'jp') return resources.guideJp;
            if(langCode === 'cn') return resources.guideCn;
            if(langCode === 'tw' || langCode === 'hk') return resources.guideTw;
            return resources.guide;
        }
    }

    const onTouchEnd = () => {
        setAction(Actions.INTRO);
    };

    return (
        <Container>
            <Sprite texture={resources.bg} anchor={0.5} position={[CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2]} />

            <Sprite texture={getTexture()} position={[CONTENT_WIDTH / 2 - getTexture().width/2, CONTENT_HEIGHT/2 - getTexture().height/2]} />
            <Sprite texture={resources.planet03} position={[450, -70]} />
            <Sprite texture={resources.planet04} position={[1650, -80]} scale={0.9} />
            <Sprite texture={resources.planet05} position={[-50, 800]} scale={0.9} />
            <Sprite texture={resources.rocket01} position={[0, 0]} scale={0.7} />

            <PixiButton position={[60, 70]} defaultTexture={resources.back} sound={sound.find("audioIntoBtn")} onTouchEnd={onTouchEnd} />
        </Container>
    );
};
