import { Container, PixiRef, Sprite } from "@pixi/react";
import { ReactNode, useContext, useRef } from "react";
import { ResourceContext } from "../context/ResourceContext";
export const GameLayout = ({ children }: { children: ReactNode }) => {
    const { resources } = useContext(ResourceContext);
    const containerRef = useRef<PixiRef<typeof Container>>(null);

    if (!resources) return null;

    return (
        <Container ref={containerRef}>
            {children}
            <Sprite name='close' texture={resources.close} position={[1840, 20]} scale={0.7} />
        </Container>
    );
};
