import { RefObject, useRef } from "react";
import { Container as PIXIContainer, Sprite as PIXISprite } from "pixi.js";
import gsap from "gsap";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../../constants/commonConstants";

interface props {
    containerRef: RefObject<PIXIContainer>;
    alienRef: RefObject<PIXIContainer>;
    spriteRef: RefObject<PIXISprite>;
    position: { x: number; y: number; direction_x: string; direction_y: string };
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
        if (alienRef.current) {
            gsap.killTweensOf(alienRef.current);
        }
    };

    const setupAnimation = () => {
        cleanupAnimations();

        const container = containerRef.current;
        const sprite = spriteRef.current;
        const alien = alienRef.current;

        if (!container || !sprite || !alien) return;

        return new Promise<void>((resolve) => {
            alien.scale.set(0, 0);
            const alienScaleAnim = gsap.to(alien.scale, {
                x: 1,
                y: 1,
                duration: 0.1,
                ease: "none",
                onComplete: () => resolve(),
            });
            animationsRef.current.push(alienScaleAnim);

            const moveAnim = gsap.fromTo(
                container,
                { x: 0, y: 100 },
                { x: position.x, y: position.y, duration: 1.5, ease: "expo.out", onComplete: () => resolve() }
            );
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
        });
    };

    const endAnimation = () => {
        return new Promise<void>((resolve) => {
            const container = containerRef.current;
            if (!container) {
                resolve();
                return;
            }

            gsap.fromTo(
                container,
                { x: position.x, y: position.y },
                {
                    x: position.direction_x === "left" ? -CONTENT_WIDTH - 200 : CONTENT_WIDTH + 200,
                    y: position.direction_y === "top" ? -CONTENT_HEIGHT - 200 : CONTENT_HEIGHT + 200,
                    duration: 0.3,
                    ease: "sine",
                    onComplete: resolve,
                }
            );
        });
    };

    return { setupAnimation, endAnimation, cleanupAnimations };
};
