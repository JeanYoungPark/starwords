import { PixiRef, Sprite, _ReactPixi, useApp } from "@pixi/react";
import { Sound } from "@pixi/sound";
import { Sprite as PIXISprite, Texture } from "pixi.js";
import { useRef, useState } from "react";

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
}

export const PixiButton = ({ defaultTexture, toggle, onTouchEnd, sound, position, ...props }: Props) => {
    const buttonRef = useRef<PixiRef<typeof Sprite> | null>(null);
    const [texture, setTexture] = useState<Texture | undefined>(defaultTexture);
    const [isToggled, setIsToggled] = useState(toggle?.initToggle || false);
    const [scale, setScale] = useState(1);

    const resetScale = () => {
        if (buttonRef.current) {
            setScale(1);
        }
    };

    const onPointUp = () => {
        if (buttonRef.current) {
            setScale(1);
        }

        if (onTouchEnd) {
            onTouchEnd(buttonRef.current!);
        }
    };

    const onPointDown = () => {
        if (buttonRef.current) {
            setScale(1.1);
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

    return (
        <Sprite
            ref={buttonRef}
            position={buttonRef.current ? buttonRef.current.position : position}
            interactive={true}
            texture={texture}
            pointerdown={onPointDown}
            pointerup={onPointUp}
            onpointerout={resetScale}
            scale={scale}
            anchor={[0.5, 0.5]}
            {...props}
        />
    );
};
