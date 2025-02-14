import { Container, PixiRef, Sprite } from "@pixi/react";
import { useContext, useEffect, useRef } from "react";
import gsap from "gsap";

import { ResourceContext } from "../../context/ResourceContext";
import { CONTENT_WIDTH } from "../../constants/commonConstants";
import { TITLE_ANIMATION } from "../../constants/introConstants";

export const Title = () => {
    const { resources } = useContext(ResourceContext);
    const titleRef = useRef<PixiRef<typeof Sprite>>(null);

    useEffect(() => {
        const title = titleRef.current;
        if (!title) return;

        gsap.fromTo(
            title.scale,
            {
                x: TITLE_ANIMATION.INITIAL.scale.start,
                y: TITLE_ANIMATION.INITIAL.scale.start,
            },
            {
                x: TITLE_ANIMATION.INITIAL.scale.end,
                y: TITLE_ANIMATION.INITIAL.scale.end,
                duration: TITLE_ANIMATION.INITIAL.duration,
                ease: TITLE_ANIMATION.INITIAL.ease,
            }
        );

        gsap.to(title.scale, {
            x: TITLE_ANIMATION.LOOP.scale,
            y: TITLE_ANIMATION.LOOP.scale,
            duration: TITLE_ANIMATION.LOOP.duration,
            repeat: -1,
            yoyo: true,
            delay: TITLE_ANIMATION.LOOP.delay,
            ease: TITLE_ANIMATION.LOOP.ease,
        });

        return () => {
            if (title) {
                gsap.killTweensOf(title);
            }
        };
    }, []);

    return (
        <Container>
            <Sprite ref={titleRef} name='title' texture={resources.title} position={[CONTENT_WIDTH / 2, 300]} anchor={0.5} />
        </Container>
    );
};
