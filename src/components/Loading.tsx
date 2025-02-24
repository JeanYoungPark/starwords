import { AnimatedSprite, Container, Sprite } from "@pixi/react";
import bg from "../assets/images/background.png";
import logo from "../assets/images/logo.png";
import { CONTENT_WIDTH } from "../constants/commonConstants";

const LOADING_FRAMES = Array.from({ length: 6 }, (_, i) => require(`../assets/images/loading/${i + 1}.png`));

export const Loading = () => {
    return (
        <Container>
            <Sprite name='bg' image={bg} position={[-350, 0]} />
            <Sprite name='logo' image={logo} position={[780, 400]} scale={1.5} />
            <AnimatedSprite
                anchor={0.5}
                position={[CONTENT_WIDTH / 2, 740]}
                images={LOADING_FRAMES}
                isPlaying={true}
                initialFrame={0}
                animationSpeed={0.2}
            />
        </Container>
    );
};
