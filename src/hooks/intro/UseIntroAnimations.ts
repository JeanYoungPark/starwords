import { Container, PixiRef } from "@pixi/react";
import { RefObject, useEffect } from "react";
import { Sprite as PixiSprite } from "pixi.js";
import gsap from "gsap";

export const UseIntroAnimations = (containerRef: RefObject<PixiRef<typeof Container>>) => {
    useEffect(() => {
        if (containerRef.current) {
            const title = containerRef.current.getChildByName("title") as PixiSprite;
            const startBtn = containerRef.current.getChildByName("startBtn");
            const rankingBtn = containerRef.current.getChildByName("rankingBtn");

            if (title && startBtn && rankingBtn) {
                animateTitleScale(title);
                animateStartButton(startBtn);
                animateRankingButton(rankingBtn);
            }
        }
    }, [containerRef]);
};

const animateTitleScale = (title: PixiSprite) => {
    gsap.fromTo(title.scale, { x: 0, y: 0 }, { x: 1, y: 1, duration: 2, repeat: 0, ease: "elastic.out(1, 0.3)" });

    gsap.to(title.scale, {
        x: 1.05,
        y: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        delay: 1.5,
        ease: "sine",
    });
};

const animateStartButton = (startBtn: any) => {
    gsap.fromTo(startBtn, { x: 0 }, { x: 980, duration: 0.7, ease: "sign" });
};

const animateRankingButton = (rankingBtn: any) => {
    gsap.fromTo(rankingBtn, { x: 1600 }, { x: 980, duration: 0.7, ease: "sign" });
};
