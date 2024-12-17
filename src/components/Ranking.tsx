import { Container, Sprite, Text } from "@pixi/react";
import React, { useContext } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { PixiButton } from "./PixiButton";
import { TextStyle } from "pixi.js";
import { useRecoilState } from "recoil";
import { actionState } from "../store/assetsStore";
import { Actions } from "../types/actionsType";

export const Ranking = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const [action, setAction] = useRecoilState(actionState);

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

            <Container position={[1130, 220]}>
                <Sprite texture={resources.rankingScoreBg} position={[0, 0]} scale={0.8} width={506} height={130} />
                <Sprite texture={resources.rankingProfile} position={[20, 20]} scale={0.35} />

                <Text
                    text='0'
                    anchor={[0.5, 0.5]}
                    position={[(resources.rankingScoreBg.width * 0.8) / 2, 50]}
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
                    position={[480, 50]}
                    style={
                        new TextStyle({
                            fontSize: 25,
                            fill: "rgba(255, 234, 68)",
                        })
                    }
                />
            </Container>

            <Sprite texture={resources.rankingBg} position={[220, 350]} scale={0.75} />

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

            <PixiButton
                name='back'
                position={[60, 70]}
                defaultTexture={resources.back}
                sound={sounds.audioIntoBtn}
                align='LEFT'
                onTouchEnd={onTouchEnd}
            />
        </Container>
    );
};
