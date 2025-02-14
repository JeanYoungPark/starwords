import { Container, PixiRef, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ResourceContext } from "../../context/ResourceContext";
import { actionState } from "../../store/assetsStore";
import { Actions } from "../../types/actionsType";
import { answerCntState } from "../../store/gameStore";
import { PixiButton } from "../common/PixiButton";
import { GameContext } from "../../context/GameContext";
import { RESULT_CORRECT_TEXT_STYLE } from "../../constants/resultContants";
import { CONTENT_WIDTH } from "../../constants/commonConstants";

export const GameFinish = () => {
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const { resources, sounds } = useContext(ResourceContext);
    const { init } = useContext(GameContext);
    const answerCnt = useRecoilValue(answerCntState);
    const setActions = useSetRecoilState(actionState);

    useEffect(() => {
        sounds["gameBgm"].stop();
        sounds["result"].play();
    }, []);

    const handleIncorrectBtn = () => {
        setActions(Actions.INCORRECT);
    };

    const handleTryAgain = () => {
        init();
        setActions(Actions.GAME_PLAY);
    };

    return (
        <Container ref={containerRef}>
            <Sprite texture={resources.bg} anchor={0.5} position={[1024, 640]} />
            <Sprite texture={resources.gamePlanet01} position={[-50, 0]} />
            <Sprite texture={resources.gamePlanet02} position={[1500, 720]} />

            <Container position={[CONTENT_WIDTH / 2 - resources.resultBg.width / 2, 280]}>
                <Sprite texture={resources.resultBg} position={[0, 0]}>
                    <Text text={`${answerCnt.correct}`} style={RESULT_CORRECT_TEXT_STYLE} position={[530, 100]} />
                    <Text text={`${answerCnt.incorrect}`} style={RESULT_CORRECT_TEXT_STYLE} />
                </Sprite>
                <Container position={[740, 350]} anchor={0.5}>
                    {answerCnt.incorrect > 0 ? (
                        <>
                            <PixiButton
                                position={[0, resources.resultBg.height - 50]}
                                defaultTexture={resources.incorrectBtn}
                                sound={sounds.audioIntoBtn}
                                onTouchEnd={handleIncorrectBtn}
                            />
                            <PixiButton
                                position={[130, resources.resultBg.height - 50]}
                                defaultTexture={resources.resultRankingBtn01}
                                sound={sounds.audioIntoBtn}
                            />
                            <PixiButton
                                position={[230, 260]}
                                defaultTexture={resources.resultTryAgainBtn01}
                                sound={sounds.audioIntoBtn}
                                interactive={true}
                                onclick={handleTryAgain}
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
                                position={[350, resources.resultBg.height - 50]}
                                defaultTexture={resources.resultTryAgainBtn02}
                                sound={sounds.audioIntoBtn}
                                interactive={true}
                                onclick={handleTryAgain}
                            />
                        </>
                    )}
                </Container>
            </Container>
            <Sprite texture={resources.tryAgain} anchor={0.5} position={[1920 / 2, 130]} scale={0.8} />
        </Container>
    );
};
