import { AnimatedSprite, Container, PixiRef, Sprite } from "@pixi/react";
import React, { memo, useContext, useEffect, useRef } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilState } from "recoil";
import { comboCntState, comboDestroyNumberState, isComboState } from "../../store/gameStore";
import { MAX_COMBO_NUMBER } from "../../constants/commonConstants";
import { Sprite as PIXISprite } from "pixi.js";
import gsap from "gsap";
import { destroyProblemIdx } from "../../util";

const NormalIcon = memo(({ data }: { data: { x: number; y: number } }) => {
    const { resources } = useContext(ResourceContext);

    return <Sprite texture={resources.maxComboBall} position={[data.x, data.y]} rotation={0} />;
});

const MaxComboIcon = memo(({ data, onComboDestroy }: { data: { x: number; y: number }; onComboDestroy: () => void }) => {
    const { resources, problems } = useContext(ResourceContext);
    const maxComboOn = [resources.maxComboBallOn01, resources.maxComboBallOn02];

    const [comboCnt, setComboCnt] = useRecoilState(comboCntState);
    const [isCombo, setIsCombo] = useRecoilState(isComboState);
    const [, setComboDestroyNum] = useRecoilState(comboDestroyNumberState);

    const comboMaxContainerRef = useRef<PixiRef<typeof Container>>(null);

    const handleMaxCombo = () => {
        // Todo
        // 외계인 색깔 변경
        // 정답 아닌 것 중 외계인 하나 destroy

        const comboMaxContainer = comboMaxContainerRef.current;
        const comboMaxBg = comboMaxContainer?.getChildByName("comboMaxOnBg") as PIXISprite;

        // 콤보 초기화
        setIsCombo(true);
        setComboCnt(0);

        // 콤보 animation gsap 제거
        gsap.killTweensOf(comboMaxBg);
        onComboDestroy();

        // // 콤보 시간 시작
        // const eachSecCheck = setInterval(() => {
        //     comboSec.current += 1;

        //     if (comboSec.current === 10) {
        //         comboSec.current = 0;
        //         setIsCombo(false);
        //         clearInterval(eachSecCheck);
        //     }
        // }, 1000);
    };

    useEffect(() => {
        const comboMaxContainer = comboMaxContainerRef.current;
        const comboMaxBg = comboMaxContainer?.getChildByName("comboMaxOnBg") as PIXISprite;

        if (!comboMaxBg) return;

        const anim = gsap.to(comboMaxBg, {
            rotation: 100,
            duration: 0.5,
            repeat: -1,
            ease: "sign",
        });

        return () => {
            anim.kill();
        };
    }, []);

    return (
        <Container ref={comboMaxContainerRef} interactive={true} onclick={handleMaxCombo}>
            <Sprite name='comboMaxOnBg' texture={resources.maxComboBallOnBg} anchor={0.5} position={[data.x + 85, data.y + 91]} />
            <AnimatedSprite
                textures={maxComboOn}
                loop={true}
                isPlaying={true}
                anchor={0.5}
                animationSpeed={0.3}
                position={[data.x + 85, data.y + 91]}
            />
            <Sprite anchor={0.5} texture={resources.maxComboBallOnText} position={[data.x + 90, data.y + 90]} />
        </Container>
    );
});

export const ComboMaxIcon = memo(({ data }: { data: { x: number; y: number } }) => {
    const { problems } = useContext(ResourceContext);
    const [comboCnt, setComboCnt] = useRecoilState(comboCntState);
    const [isCombo, setIsCombo] = useRecoilState(isComboState);
    const [, setComboDestroyNum] = useRecoilState(comboDestroyNumberState);

    // const comboMaxContainerRef = useRef<PixiRef<typeof Container>>(null);
    const comboSec = useRef<number>(0);

    const handleComboDestroy = () => {
        setIsCombo(true);
        setComboCnt(0);
        const originalIndex = destroyProblemIdx(problems.aliens);
        setComboDestroyNum(originalIndex);
    };

    return (
        <Container>
            {comboCnt === MAX_COMBO_NUMBER ? (
                <MaxComboIcon data={{ x: data.x, y: data.y }} onComboDestroy={handleComboDestroy} />
            ) : (
                <NormalIcon data={{ x: data.x, y: data.y }} />
                // <Sprite texture={resources.maxComboBall} position={[data.x, data.y]} rotation={0} />
            )}
        </Container>
    );
});
