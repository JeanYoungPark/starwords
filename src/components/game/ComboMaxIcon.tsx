import { Container, PixiRef, Sprite } from "@pixi/react";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilState } from "recoil";
import { comboCntState, comboDestroyNumberState, forceAlienRemoveState, isComboState } from "../../store/gameStore";
import { MAX_COMBO_NUMBER } from "../../constants/commonConstants";
import { Sprite as PIXISprite } from "pixi.js";
import gsap from "gsap";
import { destroyProblemIdx } from "../../util";

const NormalIcon = memo(({ data }: { data: { x: number; y: number } }) => {
    const { resources } = useContext(ResourceContext);
    return <Sprite texture={resources.maxComboBall} position={[data.x, data.y]} rotation={0} />;
});

const MaxComboIcon = memo(({ data, onClick }: { data: { x: number; y: number }; onClick: () => void }) => {
    const { resources } = useContext(ResourceContext);
    const comboMaxContainerRef = useRef<PixiRef<typeof Container>>(null);
    const [currentTexture, setCurrentTexture] = useState(resources.maxComboBallOn01);

    const handleMaxCombo = () => {
        // Todo
        // 외계인 색깔 변경
        const comboMaxContainer = comboMaxContainerRef.current;
        const comboMaxBg = comboMaxContainer?.getChildByName("comboMaxOnBg") as PIXISprite;

        // 콤보 animation gsap 제거
        gsap.killTweensOf(comboMaxBg);
        onClick();
    };

    useEffect(() => {
        const comboMaxContainer = comboMaxContainerRef.current;
        const comboMaxBg = comboMaxContainer?.getChildByName("comboMaxOnBg") as PIXISprite;
        const comboMaxText = comboMaxContainer?.getChildByName("comboMaxText") as PIXISprite;

        let frame = 0;
        const textures = [resources.maxComboBallOn01, resources.maxComboBallOn02];

        if (!comboMaxBg || !comboMaxText) return;

        const anim = gsap.to(comboMaxBg, {
            rotation: 100,
            duration: 0.5,
            repeat: -1,
            ease: "sign",
        });

        const anim2 = gsap.to(comboMaxText, {
            duration: 0.3,
            repeat: -1, // 무한 반복
            onRepeat: () => {
                frame = (frame + 1) % textures.length;
                setCurrentTexture(textures[frame]);
            },
        });

        return () => {
            anim.kill();
            anim2.kill();
        };
    }, []);

    return (
        <Container ref={comboMaxContainerRef} interactive={true} onclick={handleMaxCombo}>
            <Sprite name='comboMaxOnBg' texture={resources.maxComboBallOnBg} anchor={0.5} position={[data.x + 85, data.y + 91]} />
            <Sprite name='comboMaxText' texture={currentTexture} anchor={0.5} position={[data.x + 85, data.y + 91]} />
            <Sprite anchor={0.5} texture={resources.maxComboBallOnText} position={[data.x + 90, data.y + 90]} />
        </Container>
    );
});

export const ComboMaxIcon = memo(({ data }: { data: { x: number; y: number } }) => {
    const { problems } = useContext(ResourceContext);
    const [comboCnt, setComboCnt] = useRecoilState(comboCntState);
    const [, setIsCombo] = useRecoilState(isComboState);
    const [, setIsForceAlienRemove] = useRecoilState(forceAlienRemoveState);
    const [, setComboDestroyNum] = useRecoilState(comboDestroyNumberState);
    const comboSec = useRef<number>(0);

    const handleMaxCombo = () => {
        setIsCombo(true);
        setIsForceAlienRemove(true);
        setComboCnt(0);

        const originalIndex = destroyProblemIdx(problems.aliens);
        setComboDestroyNum(originalIndex);

        // 콤보 시간 시작
        const eachSecCheck = setInterval(() => {
            comboSec.current += 1;

            if (comboSec.current === 10) {
                comboSec.current = 0;
                setIsCombo(false);
                clearInterval(eachSecCheck);
            }
        }, 1000);
    };

    return (
        <Container>
            {comboCnt === MAX_COMBO_NUMBER ? (
                <MaxComboIcon data={{ x: data.x, y: data.y }} onClick={handleMaxCombo} />
            ) : (
                <NormalIcon data={{ x: data.x, y: data.y }} />
            )}
        </Container>
    );
});
