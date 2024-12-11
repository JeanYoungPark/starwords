import React from "react";
import { AnimatedSprite, Container, Sprite } from "@pixi/react";
import bg from "../assets/images/background.png";
import logo from "../assets/images/logo.png";

const loadingAni = [
    require("../assets/images/loading/1.png"),
    require("../assets/images/loading/2.png"),
    require("../assets/images/loading/3.png"),
    require("../assets/images/loading/4.png"),
    require("../assets/images/loading/5.png"),
    require("../assets/images/loading/6.png"),
];

export const Loading = () => {
    return (
        <Container>
            <Sprite name='bg' image={bg} />
            <Sprite name='logo' image={logo} position={[780, 400]} scale={1.5} />
            <AnimatedSprite anchor={0.5} position={[960, 740]} images={loadingAni} isPlaying={true} initialFrame={0} animationSpeed={0.2} />
        </Container>
    );
};
