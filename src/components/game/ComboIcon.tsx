import { PixiRef, Sprite } from "@pixi/react";
import { useContext, useEffect, useRef } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilState } from "recoil";
import { comboCntState } from "../../store/gameStore";
import { COMBO_TEXT_POSITION } from "../../constants/commonConstants";
import { Sprite as PIXISprite } from "pixi.js";
import gsap from "gsap";

export const ComboIcon = ({ i, data }: { i: number; data: { x: number; y: number } }) => {
    const { resources } = useContext(ResourceContext);
    const [comboCnt, setComboCnt] = useRecoilState(comboCntState);

    const comboTextRefs = useRef<PixiRef<typeof Sprite> | null>(null);
    const texture = i < comboCnt ? resources[`comboBallOn0${i + 1}`] : resources.comboBall;

    useEffect(() => {
        if (!comboCnt) return;

        const comboText = comboTextRefs.current as PIXISprite;

        if (comboCnt === i + 1) {
            gsap.fromTo(
                comboText,
                { y: COMBO_TEXT_POSITION[i].y },
                {
                    y: COMBO_TEXT_POSITION[i].y - 30,
                    duration: 0.5,
                    ease: "sign",
                    onComplete: () => {
                        setTimeout(() => {
                            comboText.visible = false;
                        }, 500);
                    },
                }
            );
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
                    position={[data.x + 34, data.y - 20]}
                />
            )}
        </>
    );
};
