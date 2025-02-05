import { RefObject, useContext, useEffect, useRef } from "react";
import { PixiButton } from "../PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilState } from "recoil";
import { actionState } from "../../store/assetsStore";
import { Actions } from "../../types/actionsType";
import { Container, PixiRef } from "@pixi/react";
import gsap from "gsap";

export const StartBtn = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const [action, setAction] = useRecoilState(actionState);

    const startBtnRef = useRef<PixiRef<typeof Container>>(null);

    const animateStartButton = ({ startBtnRef }: { startBtnRef: RefObject<PixiRef<typeof Container>> }) => {
        if (!startBtnRef.current) return;

        const startBtn = startBtnRef.current.getChildByName("startBtn");

        gsap.fromTo(startBtn, { x: 0 }, { x: 980, duration: 0.7, ease: "sign" });
    };

    const handleStart = () => {
        setAction(Actions.GAME_START);
    };

    useEffect(() => {
        animateStartButton({ startBtnRef });
    }, [startBtnRef]);

    return (
        <Container ref={startBtnRef}>
            <PixiButton
                name='startBtn'
                position={[720, 750]}
                defaultTexture={resources.startBtn}
                sound={sounds.audioIntoBtn}
                onTouchEnd={handleStart}
            />
        </Container>
    );
};
