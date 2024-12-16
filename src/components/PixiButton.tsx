import { PixiRef, Sprite, _ReactPixi } from "@pixi/react";
import { Sound } from "@pixi/sound";
import { Sprite as PIXISprite, Texture } from "pixi.js";
import { useLayoutEffect, useRef, useState } from "react";

interface Props extends _ReactPixi.ISprite {
    defaultTexture: Texture;
    toggle?: {
        active: boolean;
        initToggle?: boolean;
        texture?: Texture | undefined;
        onToggle?: (target?: PIXISprite, isToggle?: boolean) => void;
    };
    onTouchStart?: (target?: PIXISprite) => void;
    onTouchEnd?: (target?: PIXISprite) => void;
    sound?: Sound;
    align?: "LEFT" | "RIGHT";
    verticalAlign?: "TOP" | "BOTTOM";
}

export const PixiButton = ({ defaultTexture, toggle, onTouchEnd, sound, align, verticalAlign, position, ...props }: Props) => {
    const buttonRef = useRef<PixiRef<typeof Sprite> | null>(null);
    const [texture, setTexture] = useState<Texture | undefined>(defaultTexture);
    const [isToggled, setIsToggled] = useState(toggle?.initToggle || false);
    const [scale, setScale] = useState(0.7);

    const setBtnPos = () => {
        if (align === "LEFT") {
            buttonRef.current!.position.x = 20;
        } else if (align === "RIGHT") {
            buttonRef.current!.position.x = 1840;
        }

        if (verticalAlign === "TOP") {
            buttonRef.current!.position.y = 20;
        } else if (verticalAlign === "BOTTOM") {
            buttonRef.current!.position.y = 1000;
        }
    };

    const resizeApp = () => {
        if (buttonRef.current) {
            setTimeout(() => setBtnPos(), 1);
        }
    };

    const onPointUp = () => {
        if (buttonRef.current) {
            setScale(0.7);
        }

        if (onTouchEnd) {
            onTouchEnd(buttonRef.current!);
        }
    };

    const onPointDown = () => {
        if (buttonRef.current) {
            setScale(0.8);
        }

        if (sound) {
            sound.play();
        }

        if (toggle?.active && toggle?.texture) {
            const newToggleState = !isToggled;
            setIsToggled(newToggleState);
            setTexture(newToggleState ? defaultTexture : toggle.texture);

            toggle?.onToggle && toggle.onToggle();
        }
    };

    useLayoutEffect(() => {
        if (align || verticalAlign) {
            window.addEventListener("resize", resizeApp);
            setBtnPos();
        }

        return () => {
            window.removeEventListener("resize", resizeApp);
        };
    }, []);

    return (
        <Sprite
            ref={buttonRef}
            position={buttonRef.current?.position ? buttonRef.current.position : position}
            interactive={true}
            texture={texture}
            pointerdown={onPointDown}
            pointerup={onPointUp}
            scale={scale}
            {...props}
        />
    );
};
