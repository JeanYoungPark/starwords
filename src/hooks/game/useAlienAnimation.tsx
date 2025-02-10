import { RefObject, useEffect, useLayoutEffect, useRef } from "react";
import { Container as PIXIContainer, Sprite as PIXISprite } from "pixi.js";
import gsap from "gsap";

interface props {
    containerRef: RefObject<PIXIContainer>;
    alienRef: RefObject<PIXIContainer>;
    spriteRef: RefObject<PIXISprite>;
    position: { x: number; y: number };
}

export const useAlienAnimation = ({ containerRef, alienRef, spriteRef, position }: props) => {
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const setupAnimation = () => {
        const container = containerRef.current as PIXIContainer;
        const sprite = spriteRef.current as PIXISprite;

        if (!container || !sprite) return;

        gsap.fromTo(container, { x: 200, y: 150 }, { x: position.x, y: position.y, duration: 0.5, ease: "sign" });

        timelineRef.current = gsap
            .timeline({ repeat: -1 })
            .to(sprite, {
                x: 10,
                rotation: 0.03,
                duration: 1.5,
                ease: "power1.inOut",
            })
            .to(sprite, {
                x: -10,
                rotation: -0.03,
                duration: 3,
                ease: "power1.inOut",
            })
            .to(sprite, {
                x: 0,
                rotation: 0,
                duration: 1.5,
                ease: "power1.inOut",
            });

        gsap.to(sprite.scale, {
            x: 0.9,
            y: 0.9,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "none",
        });
    };

    useEffect(() => {
        setupAnimation();

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
                timelineRef.current = null;
            }
            const container = containerRef.current;
            const alien = alienRef.current;

            if (container) gsap.killTweensOf(container);
            if (alien) gsap.killTweensOf(alien);
        };
    }, []);
};
