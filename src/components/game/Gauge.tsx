import { MutableRefObject, useContext, useEffect, useRef } from "react";
import { PixiRef, Sprite, useTick } from "@pixi/react";
import { Sprite as PIXISprite } from "pixi.js";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameActionState } from "../../store/assetsStore";
import { GameActions } from "../../types/actionsType";

interface props {
    timeLeft: MutableRefObject<number>;
    timeSpeed: MutableRefObject<number>;
}

export const Gauge = ({ timeLeft, timeSpeed }: props) => {
    const { resources } = useContext(ResourceContext);
    const gameAction = useRecoilValue(gameActionState);

    const gaugeRef = useRef<PixiRef<typeof Sprite>>(null);

    const gaugeSetting = () => {
        const gauge = gaugeRef.current as PIXISprite;

        if (gauge) {
            gauge.x = 720;
            gauge.y = 980;
        }
    };

    useEffect(() => {
        if (gameAction === GameActions.STAND_BY) {
            gaugeSetting();
        }
    }, [gameAction]);

    useTick((delta) => {
        if (gameAction === GameActions.START) {
            if (timeLeft.current > 0) {
                const gauge = gaugeRef.current as PIXISprite;

                if (gauge) {
                    gauge.x -= timeSpeed.current * delta;

                    if (timeLeft.current === 10) {
                        gauge.texture = resources.gauge2;
                    }
                }
            }
        }
    });

    return <Sprite ref={gaugeRef} name='gauge' texture={resources.gauge} />;
};
