import { Container, Sprite, Text } from "@pixi/react";
import React, { useContext, useState } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { PixiButton } from "./common/PixiButton";
import { TextStyle } from "pixi.js";
import { useRecoilState } from "recoil";
import { actionState } from "../store/assetsStore";
import { Actions } from "../types/actionsType";

export const Ranking = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const [action, setAction] = useRecoilState(actionState);
    const [page, setPage] = useState<number>(1);

    const handleStartGuide = () => {
        setAction(Actions.GUIDE);
    };

    const onTouchEnd = () => {
        setAction(Actions.INTRO);
    };

    return (
        <Container>
            <Sprite texture={resources.bg} position={[0, 0]} />

            <Container position={[220, 140]}>
                <Text
                    text={`The Blobs 24.The Blobs at the Campground`}
                    position={[0, 0]}
                    style={
                        new TextStyle({
                            fontSize: 30,
                            fill: "rgba(170, 242, 246)",
                        })
                    }
                />
                <Sprite texture={resources.rankingPrize} position={[0, 60]} />
                <Sprite texture={resources.rankingTitle} position={[150, 110]} />
                <Text
                    text='2024년 12월 3주차'
                    position={[160, 70]}
                    style={
                        new TextStyle({
                            fontSize: 30,
                            fill: "rgba(255, 234, 68)",
                        })
                    }
                />
            </Container>

            <Container position={[1130, 200]}>
                <Sprite texture={resources.rankingScoreBg} position={[0, 0]} width={506} height={130} />
                <Sprite texture={resources.rankingProfile} position={[30, 25]} scale={0.4} />

                <Text
                    text='0'
                    anchor={[0.5, 0.5]}
                    position={[506 / 2, 65]}
                    style={
                        new TextStyle({
                            fontSize: 40,
                            fill: "rgba(255, 234, 68)",
                            fontWeight: "bold",
                        })
                    }
                />

                <Text
                    text='점'
                    anchor={0.5}
                    position={[460, 65]}
                    style={
                        new TextStyle({
                            fontSize: 25,
                            fill: "rgba(255, 234, 68)",
                        })
                    }
                />
            </Container>

            <Container position={[220, 350]}>
                <Sprite texture={resources.rankingBg} position={[0, 0]} scale={0.75} />
                {Array.from({ length: 5 }, (_, idx: number) => {
                    return (
                        <Container key={idx} position={[0, idx * 115]}>
                            {idx < 3 ? (
                                <Sprite texture={resources.gold} position={[150, 40]} scale={0.75} />
                            ) : (
                                <Text
                                    text={`${idx + 1}`}
                                    position={[170, 50]}
                                    style={
                                        new TextStyle({
                                            fontSize: 30,
                                            fill: "rgba(256,256,256)",
                                            fontWeight: "bold",
                                        })
                                    }
                                />
                            )}
                            <Sprite texture={resources.rankingProfile} position={[220, 30]} scale={0.4} />
                            <Text
                                text='이름'
                                position={[310, 50]}
                                style={
                                    new TextStyle({
                                        fontSize: 30,
                                        fill: "rgba(256,256,256)",
                                    })
                                }
                            />
                            <Container position={[(resources.rankingBg.width * 0.75) / 2 - resources.rankingUserScoreBg.width - 30, 40]}>
                                <Sprite texture={resources.rankingUserScoreBg} position={[0, 0]} />
                                <Text
                                    text={`3,000 점`}
                                    position={[50, 10]}
                                    style={
                                        new TextStyle({
                                            fontSize: 30,
                                            fill: "rgba(255, 234, 68)",
                                            fontWeight: "bold",
                                        })
                                    }
                                />
                            </Container>
                        </Container>
                    );
                })}
            </Container>

            <Text
                text='초기화까지 5일 9시간 13분 남음'
                position={[220, 970]}
                style={
                    new TextStyle({
                        fontSize: 20,
                        fill: "rgba(172, 169, 182)",
                    })
                }
            />

            <PixiButton name='back' position={[60, 70]} defaultTexture={resources.back} sound={sounds.audioIntoBtn} onTouchEnd={onTouchEnd} />

            <PixiButton position={[1860, 1020]} defaultTexture={resources.help} sound={sounds.audioIntoBtn} onTouchEnd={handleStartGuide} />
        </Container>
    );
};
