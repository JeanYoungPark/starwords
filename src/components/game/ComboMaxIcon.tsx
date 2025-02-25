import { Container, PixiRef, Sprite } from "@pixi/react";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { Sprite as PIXISprite } from "pixi.js";
import gsap from "gsap";

import { ResourceContext } from "../../context/ResourceContext";
import { MAX_COMBO_NUMBER } from "../../constants/commonConstants";
import { destroyProblemIdx } from "../../util";
import { GameContext } from "../../context/GameContext";

const NormalIcon = memo(({ data }: { data: { x: number; y: number } }) => {
    const { resources } = useContext(ResourceContext);
    return <Sprite texture={resources.maxComboBall} position={[data.x, data.y]} rotation={0} />;
});

const MaxIcon = memo(({ data, onTouchend }: { data: { x: number; y: number }; onTouchend: () => void }) => {
    const { resources } = useContext(ResourceContext);
    const { animActive } = useContext(GameContext);
    const comboMaxContainerRef = useRef<PixiRef<typeof Container>>(null);
    const [currentTexture, setCurrentTexture] = useState(resources.maxComboBallOn01);

    const handleMaxCombo = () => {
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
        <Container ref={comboMaxContainerRef} interactive={!animActive ? true : false} ontouchend={handleMaxCombo}>
            <Sprite name='comboMaxOnBg' texture={resources.maxComboBallOnBg} anchor={0.5} position={[data.x + 85, data.y + 91]} />
            <Sprite name='comboMaxText' texture={currentTexture} anchor={0.5} position={[data.x + 85, data.y + 91]} />
            <Sprite anchor={0.5} texture={resources.maxComboBallOnText} position={[data.x + 90, data.y + 90]} />
        </Container>
    );
});

export const ComboMaxIcon = memo(({ data }: { data: { x: number; y: number } }) => {
    const { problems, comboCnt, setComboCnt, setComboActive, setComboDestroyNum } = useContext(GameContext);
    const comboSec = useRef<number>(0);
    const comboTimeoutId = useRef<NodeJS.Timeout | undefined>(undefined);

    if (!problems) return null;

    const comboTime = () => {
        comboSec.current += 1;

        if (comboSec.current === 10) {
            console.log("combo done");
            comboSec.current = 0;
            setComboActive(false);
        }

        comboTimeoutId.current = setTimeout(comboTime, 1000);
    };

    const handleOnClickMaxCombo = () => {
        setComboActive(true);
        setComboCnt(0);

        const originalIndex = destroyProblemIdx(problems.aliens);
        setComboDestroyNum(originalIndex);
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
});
