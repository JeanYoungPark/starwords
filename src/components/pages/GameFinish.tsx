import { Container, PixiRef, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ResourceContext } from "../../context/ResourceContext";
import { actionState, gameTypeState } from "../../store/assetsStore";
import { Actions } from "../../types/actionsType";
import { answerCntState } from "../../store/gameStore";
import { PixiButton } from "../common/PixiButton";
import { GameContext } from "../../context/GameContext";
import { RESULT_CORRECT_COMBO_TEXT_STYLE, RESULT_CORRECT_TEXT_STYLE, RESULT_SCORE_TEXT_STYLE } from "../../constants/resultContants";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../../constants/commonConstants";
import { numberComma } from "../../util";
import { Resource, Texture } from "pixi.js";
import { postGameData } from "../../apis/postData";

export const GameFinish = () => {
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const { resources, sounds } = useContext(ResourceContext);
    const { init } = useContext(GameContext);
    const answerCnt = useRecoilValue(answerCntState);
    const gameType = useRecoilValue(gameTypeState);
    const setActions = useSetRecoilState(actionState);
    const [resultImg, setResultImg] = useState<Texture<Resource>>(resources.tryAgain);

    useEffect(() => {
        // postGameData({  });

        sounds["gameBgm"].stop();
        sounds["result"].play();
    }, []);

    useEffect(() => {
        const avg = answerCnt.correct / (answerCnt.correct + answerCnt.incorrect);

        let img = resources.tryAgain;

        if (gameType === "word_master") {
            img = avg >= 0.7 ? resources.didIt : resources.dontGiveUp;
        } else {
            img = avg >= 1 ? resources.excellent : avg >= 0.7 ? resources.good : resources.tryAgain;
        }

        setResultImg(img);
    }, [gameType]);

    const handleIncorrectBtn = () => {
        setActions(Actions.INCORRECT);
    };

    const handleRankingBtn = () => {
        setActions(Actions.RANKING);
    };

    return (
        <Container ref={containerRef}>
            <Sprite texture={resources.bg} anchor={0.5} position={[CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2]} />
            <Sprite texture={resources.gamePlanet01} position={[-50, 0]} />
            <Sprite texture={resources.gamePlanet02} position={[1500, 720]} />

            <Container position={[CONTENT_WIDTH / 2 - resources.resultBg.width / 2, 280]}>
                <Sprite texture={resources.resultBg} position={[0, 0]}>
                    <Sprite texture={resources.profile} scale={0.5} position={[resources.resultBg.width - 640, 130]} />
                    <Text text={`${numberComma(answerCnt.correct)}`} style={RESULT_CORRECT_TEXT_STYLE} position={[550, 130]} anchor={0.5} />
                    <Text text={`${numberComma(answerCnt.incorrect)}`} style={RESULT_CORRECT_TEXT_STYLE} position={[550, 280]} anchor={0.5} />
                    <Text
                        text={`${numberComma(answerCnt.combo * 200)} 점`}
                        style={RESULT_CORRECT_COMBO_TEXT_STYLE}
                        position={[550, 430]}
                        anchor={0.5}
                    />

                    <Text text={`-`} style={RESULT_CORRECT_COMBO_TEXT_STYLE} position={[resources.resultBg.width - 590, 380]} anchor={0.5} />
                    <Text
                        text={`${numberComma(answerCnt.correct * 100 + answerCnt.combo * 200)} 점`}
                        style={RESULT_SCORE_TEXT_STYLE}
                        position={[resources.resultBg.width - 250, 380]}
                        anchor={0.5}
                    />
                </Sprite>
                <Container position={[370, -70]} anchor={0.5}>
                    {answerCnt.incorrect > 0 ? (
                        <>
                            <PixiButton
                                position={[0, resources.resultBg.height - 50]}
                                defaultTexture={resources.incorrectBtn}
                                sound={sounds.audioIntoBtn}
                                onTouchEnd={handleIncorrectBtn}
                            />
                            <PixiButton
                                position={[500, resources.resultBg.height - 50]}
                                defaultTexture={resources.resultRankingBtn01}
                                sound={sounds.audioIntoBtn}
                                onTouchEnd={handleRankingBtn}
                            />
                            <PixiButton
                                position={[870, resources.resultBg.height - 50]}
                                defaultTexture={resources.resultTryAgainBtn01}
                                sound={sounds.audioIntoBtn}
                                interactive={true}
                                onclick={init}
                            />
                        </>
                    ) : (
                        <>
                            <PixiButton
                                position={[0, resources.resultBg.height - 50]}
                                defaultTexture={resources.resultRankingBtn02}
                                sound={sounds.audioIntoBtn}
                            />
                            <PixiButton
                                position={[700, resources.resultBg.height - 50]}
                                defaultTexture={resources.resultTryAgainBtn02}
                                sound={sounds.audioIntoBtn}
                                interactive={true}
                                onclick={init}
                            />
                        </>
                    )}
                </Container>
            </Container>

            <Sprite texture={resultImg} anchor={0.5} position={[1920 / 2, 130]} scale={0.8} />
        </Container>
    );
};
