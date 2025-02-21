import { useContext, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { Container, PixiRef } from "@pixi/react";
import gsap from "gsap";

import { PixiButton } from "../common/PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { actionState } from "../../store/assetsStore";
import { Actions } from "../../types/actionsType";
import { CONTENT_WIDTH } from "../../constants/commonConstants";
import { RANKING_BUTTON } from "../../constants/introConstants";
import { sound } from "@pixi/sound";

export const RankingBtn = () => {
    const { resources } = useContext(ResourceContext);
    const setAction = useSetRecoilState(actionState);
    const containerRef = useRef<PixiRef<typeof Container>>(null);

    const handleRanking = () => {
        setAction(Actions.RANKING);
    };

    useEffect(() => {
        const button = containerRef.current?.getChildByName("rankingBtn");
        if (!button) return;

        const animation = gsap.fromTo(
            button,
            { x: RANKING_BUTTON.POSITION.start },
            {
                x: RANKING_BUTTON.POSITION.end,
                duration: RANKING_BUTTON.ANIMATION.duration,
                ease: RANKING_BUTTON.ANIMATION.ease,
            }
        );

        return () => {
            if (animation) {
                animation.kill();
            }
        };
    }, []);

    return (
        <Container ref={containerRef}>
            <PixiButton
                name='rankingBtn'
                position={[CONTENT_WIDTH / 2, RANKING_BUTTON.POSITION.y]}
                defaultTexture={resources.rankingBtn}
                sound={sound.find("audioIntoBtn")}
                onTouchEnd={handleRanking}
            />
        </Container>
    );
};
