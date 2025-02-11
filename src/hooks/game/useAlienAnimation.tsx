import { RefObject, useEffect, useRef } from "react";
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
    const animationsRef = useRef<gsap.core.Tween[]>([]);

    const cleanupAnimations = () => {
        if (timelineRef.current) {
            timelineRef.current.kill();
            timelineRef.current = null;
        }

        animationsRef.current.forEach((anim) => anim.kill());
        animationsRef.current = [];

        if (containerRef.current) {
            gsap.killTweensOf(containerRef.current);
        }
        if (spriteRef.current) {
            gsap.killTweensOf(spriteRef.current);
            if (spriteRef.current.scale) {
                gsap.killTweensOf(spriteRef.current.scale);
            }
        }
    };

    const setupAnimation = () => {
        console.log(32423);
        cleanupAnimations();

        const container = containerRef.current;
        const sprite = spriteRef.current;

        if (!container || !sprite) return;

        const moveAnim = gsap.fromTo(container, { x: 200, y: 150 }, { x: position.x, y: position.y, duration: 0.5, ease: "sine" });
        animationsRef.current.push(moveAnim);

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

        const scaleAnim = gsap.to(sprite.scale, {
            x: 0.9,
            y: 0.9,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "none",
        });
        animationsRef.current.push(scaleAnim);
    };

    useEffect(() => {
        return () => {
            cleanupAnimations();
        };
    }, []);

    return { setupAnimation };
};
