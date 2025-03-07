import { Container, PixiRef, Sprite } from "@pixi/react";
import { memo, MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { Sprite as PIXISprite, FederatedPointerEvent } from "pixi.js";
import gsap from "gsap";

import { ResourceContext } from "../../context/ResourceContext";
import { MAX_COMBO_NUMBER } from "../../constants/commonConstants";
import { destroyProblemIdx } from "../../util";
import { GameContext } from "../../context/GameContext";
import { useRecoilValue } from "recoil";
import { animActiveState } from "../../store/gameStore";

const NormalIcon = memo(({ data }: { data: { x: number; y: number } }) => {
    const { resources } = useContext(ResourceContext);
    return <Sprite texture={resources.maxComboBall} position={[data.x, data.y]} rotation={0} />;
});

const MaxIcon = memo(({ data, onTouchend }: { data: { x: number; y: number }; onTouchend: () => void }) => {
    const { resources } = useContext(ResourceContext);
    const animActive = useRecoilValue(animActiveState);
    const comboMaxContainerRef = useRef<PixiRef<typeof Container>>(null);
    const [currentTexture, setCurrentTexture] = useState(resources.maxComboBallOn01);
    
    const handleMaxCombo = (e: FederatedPointerEvent) => {
        e.preventDefault();

        // TODO: 외계인 색깔 변경
        const comboMaxContainer = comboMaxContainerRef.current;
        const comboMaxBg = comboMaxContainer?.getChildByName("comboMaxOnBg") as PIXISprite;
        const comboMaxText = comboMaxContainer?.getChildByName("comboMaxText") as PIXISprite;

        gsap.killTweensOf(comboMaxBg);
        gsap.killTweensOf(comboMaxText);
        onTouchend();
    };

    useEffect(() => {
        const comboMaxContainer = comboMaxContainerRef.current;
        const comboMaxBg = comboMaxContainer?.getChildByName("comboMaxOnBg") as PIXISprite;
        const comboMaxText = comboMaxContainer?.getChildByName("comboMaxText") as PIXISprite;

        let frame = 0;
        const textures = [resources.maxComboBallOn01, resources.maxComboBallOn02];

        if (!comboMaxBg || !comboMaxText) return;

        gsap.to(comboMaxBg, {
            rotation: 100,
            duration: 0.5,
            repeat: -1,
            ease: "sign",
        });

        gsap.to(comboMaxText, {
            duration: 0.3,
            repeat: -1,
            onRepeat: () => {
                frame = (frame + 1) % textures.length;
                setCurrentTexture(textures[frame]);
            },
        });

        return () => {
            if (comboMaxBg) {
                gsap.killTweensOf(comboMaxBg);
            }

            if (comboMaxText) {
                gsap.killTweensOf(comboMaxText);
            }
        };
    }, []);

    return (
        <Container ref={comboMaxContainerRef} interactive={!animActive} ontouchend={(e) => handleMaxCombo(e)} onclick={handleMaxCombo}>
            <Sprite name='comboMaxOnBg' texture={resources.maxComboBallOnBg} anchor={0.5} position={[data.x + 85, data.y + 91]} />
            <Sprite name='comboMaxText' texture={currentTexture} anchor={0.5} position={[data.x + 85, data.y + 91]} />
            <Sprite anchor={0.5} texture={resources.maxComboBallOnText} position={[data.x + 90, data.y + 90]} />
        </Container>
    );
});

export const ComboMaxIcon = memo(
    ({
        data,
        comboSec,
        comboTimeoutId,
    }: {
        data: { x: number; y: number };
        comboSec: MutableRefObject<number>;
        comboTimeoutId: MutableRefObject<NodeJS.Timeout | undefined>;
    }) => {
        const { problems, comboCnt, comboActive, setComboCnt, setComboActive, setComboDestroyNum } = useContext(GameContext);

        if (!problems) return null;

        const comboTime = () => {
            if (comboSec.current >= 10) {
                comboSec.current = 0;
                setComboActive(false);
                clearTimeout(comboTimeoutId.current);
                return;
            }

            comboSec.current += 1;

            comboTimeoutId.current = setTimeout(comboTime, 1000);
        };

        const handleOnClickMaxCombo = () => {
            if(comboActive){
                comboSec.current = 0;
                clearTimeout(comboTimeoutId.current);
            }else{
                const originalIndex = destroyProblemIdx(problems.aliens);
                setComboDestroyNum(originalIndex);
            }
            
            setComboActive(true);
            setComboCnt(0);
            comboTime();
        };

        return (
            <Container>
                {comboCnt === MAX_COMBO_NUMBER ? (
                    <MaxIcon data={{ x: data.x, y: data.y }} onTouchend={handleOnClickMaxCombo} />
                ) : (
                    <NormalIcon data={{ x: data.x, y: data.y }} />
                )}
            </Container>
        );
    }
);