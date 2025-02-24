import { AnimatedSprite, Sprite } from "@pixi/react";
import React, { useContext } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../../constants/commonConstants";

const LOADING_FRAMES = Array.from({ length: 6 }, (_, i) => require(`../../assets/images/loading/${i + 1}.png`));

export const Loading = () => {
    const { resources } = useContext(ResourceContext);

    return (
        <>
            <Sprite name='titleBg' texture={resources.titleBg} position={[0, 0]} width={CONTENT_WIDTH} height={CONTENT_HEIGHT} alpha={0.5} />
            <AnimatedSprite
                anchor={0.5}
                position={[CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2]}
                images={LOADING_FRAMES}
                isPlaying={true}
                initialFrame={0}
                animationSpeed={0.2}
            />
        </>
    );
};
