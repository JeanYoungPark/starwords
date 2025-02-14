import { PixiRef, Sprite } from "@pixi/react";
import { useContext, useEffect, useRef } from "react";
import { Sprite as PIXISprite } from "pixi.js";
import gsap from "gsap";

import { ResourceContext } from "../../context/ResourceContext";
import { COMBO_TEXT_POSITION } from "../../constants/commonConstants";
import { GameContext } from "../../context/GameContext";

export const ComboIcon = ({ i, data }: { i: number; data: { x: number; y: number } }) => {
    const { resources } = useContext(ResourceContext);
    const { comboCnt } = useContext(GameContext);

    const comboTextRefs = useRef<PixiRef<typeof Sprite> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof window.setTimeout>>();
    const texture = i < comboCnt ? resources[`comboBallOn0${i + 1}`] : resources.comboBall;

    useEffect(() => {
        if (!comboCnt) return;

        const comboText = comboTextRefs.current as PIXISprite;

        if (comboCnt === i + 1) {
            comboText.visible = true;

            gsap.fromTo(
                comboText,
                { y: COMBO_TEXT_POSITION[i].y },
                {
                    y: COMBO_TEXT_POSITION[i].y - 25,
                    duration: 0.5,
                    ease: "sign",
                    onComplete: () => {
                        timeoutRef.current = setTimeout(() => {
                            if (comboText) {
                                comboText.visible = false;
                            }
                        }, 500);
                    },
                }
            );

            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                gsap.killTweensOf(comboText);
                if (comboText) {
                    comboText.visible = false;
                }
            };
        }
    }, [comboCnt]);

    return (
        <>
            <Sprite texture={texture} position={[data.x, data.y]} />
            {comboCnt === i + 1 && (
                <Sprite
                    ref={comboTextRefs}
                    name={`comboText0${i + 1}`}
                    texture={resources[`comboBallOnText0${comboCnt}`]}
                    anchor={0.5}
                    position={[data.x + 34, data.y - 25]}
                />
            )}
        </>
    );
};
