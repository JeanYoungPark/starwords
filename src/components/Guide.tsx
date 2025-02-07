import { Container, Sprite } from "@pixi/react";
import { useContext } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { PixiButton } from "./common/PixiButton";
import { actionState } from "../store/assetsStore";
import { useRecoilState } from "recoil";
import { Actions } from "../types/actionsType";

export const Guide = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const [action, setAction] = useRecoilState(actionState);

    const onTouchEnd = () => {
        setAction(Actions.INTRO);
    };

    return (
        <Container>
            <Sprite texture={resources.bg} position={[0, 0]} />

            <Sprite texture={resources.guide} position={[300, 150]} />
            <Sprite texture={resources.planet03} position={[450, -70]} />
            <Sprite texture={resources.planet04} position={[1650, -80]} scale={0.9} />
            <Sprite texture={resources.planet05} position={[-50, 800]} scale={0.9} />
            <Sprite texture={resources.rocket01} position={[0, 0]} scale={0.7} />

            <PixiButton name='back' position={[60, 70]} defaultTexture={resources.back} sound={sounds.audioIntoBtn} onTouchEnd={onTouchEnd} />
        </Container>
    );
};
