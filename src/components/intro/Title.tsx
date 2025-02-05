import { Container, PixiRef, Sprite, Text } from "@pixi/react";
import { RefObject, useContext, useEffect, useRef } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilValue } from "recoil";
import { gameTypeState } from "../../store/assetsStore";
import { TextStyle } from "pixi.js";
import gsap from "gsap";

export const Title = () => {
    const { resources, contentsData } = useContext(ResourceContext);
    const gameType = useRecoilValue(gameTypeState);

    const titleRef = useRef<PixiRef<typeof Sprite>>(null);

    const animateTitleScale = ({ titleRef }: { titleRef: RefObject<PixiRef<typeof Sprite>> }) => {
        if (!titleRef.current) return;

        const title = titleRef.current;

        gsap.fromTo(title.scale, { x: 0, y: 0 }, { x: 1, y: 1, duration: 2, repeat: 0, ease: "elastic.out(1, 0.3)" });

        gsap.to(title.scale, {
            x: 1.05,
            y: 1.05,
            duration: 2,
            repeat: -1,
            yoyo: true,
            delay: 1.5,
            ease: "sine",
        });
    };

    useEffect(() => {
        animateTitleScale({ titleRef });
    }, [titleRef]);

    return (
        <Container>
            <Sprite ref={titleRef} name='title' texture={resources.title} position={[980, 300]} anchor={[0.5, 0.5]} />
            <Container position={[1920 / 2, 510]}>
                <Sprite name='titleBg' texture={resources.titleBg} position={[-(1358 / 2), 0]} width={1358} height={150} alpha={0.5} />
                <Text
                    text={gameType === "word_master" ? contentsData.cont_title : contentsData.cont_name}
                    anchor={[0.5, 0.5]}
                    position={[0, contentsData.mid_name ? 30 : 50]}
                    style={
                        new TextStyle({
                            fontFamily: "NotoSans",
                            fontSize: 34,
                            fill: "rgba(170, 242, 246)",
                            fontWeight: "700",
                        })
                    }
                />
                {gameType !== "word_master" && (
                    <Text
                        text={contentsData.mid_name}
                        anchor={[0.5, 0.5]}
                        position={[0, 80]}
                        style={
                            new TextStyle({
                                fontFamily: "NotoSans",
                                fontSize: 34,
                                fill: "rgba(170, 242, 246)",
                                fontWeight: "700",
                            })
                        }
                    />
                )}
                <Text
                    text={gameType === "word_master" ? `Stage ${contentsData.stage}` : contentsData.cont_sub_name}
                    anchor={[0.5, 0.5]}
                    position={[0, contentsData.mid_name ? 130 : 100]}
                    style={
                        new TextStyle({
                            fontFamily: "NotoSans",
                            fontSize: 34,
                            fill: "rgba(170, 242, 246)",
                            fontWeight: "700",
                        })
                    }
                />
            </Container>
        </Container>
    );
};
