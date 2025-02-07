import { useContext, useEffect, useRef } from "react";
import { Container, PixiRef } from "@pixi/react";
import { useSetRecoilState } from "recoil";
import gsap from "gsap";

import { PixiButton } from "../common/PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { actionState } from "../../store/assetsStore";
import { Actions } from "../../types/actionsType";
import { CONTENT_WIDTH } from "../../constants/commonConstants";
import { START_BUTTON } from "../../constants/introConstants";

export const StartBtn = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const setAction = useSetRecoilState(actionState);
    const startBtnRef = useRef<PixiRef<typeof Container>>(null);

    const handleStart = () => {
        setAction(Actions.GAME_PLAY);
    };

    useEffect(() => {
        const button = startBtnRef.current?.getChildByName("startBtn");
        if (!button) return;

        const animation = gsap.fromTo(
            button,
            { x: START_BUTTON.POSITION.start },
            {
                x: START_BUTTON.POSITION.end,
                duration: START_BUTTON.ANIMATION.duration,
                ease: START_BUTTON.ANIMATION.ease,
            }
        );

        return () => {
            if (animation) {
                animation.kill();
            }
        };
    }, []);

    return (
        <Container ref={startBtnRef}>
            <PixiButton
                name='startBtn'
                position={[CONTENT_WIDTH / 2, START_BUTTON.POSITION.y]}
                defaultTexture={resources.startBtn}
                sound={sounds.audioIntoBtn}
                onTouchEnd={handleStart}
            />
        </Container>
    );
};
