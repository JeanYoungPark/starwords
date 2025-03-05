import { Container } from "@pixi/react";
import React, { useContext } from "react";
import { ResultButtonConfig } from "../../types/resourcesType";
import { PixiButton } from "../common/PixiButton";
import { sound } from "@pixi/sound";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { actionState, gameTypeState } from "../../store/assetsStore";
import { GameContext } from "../../context/GameContext";
import { Actions } from "../../types/actionsType";
import { ResourceContext } from "../../context/ResourceContext";
import { answerCntState } from "../../store/gameStore";

export const Buttons = () => {
    const { resources } = useContext(ResourceContext);
    const { init } = useContext(GameContext);
    const setActions = useSetRecoilState(actionState);
    const answerCnt = useRecoilValue(answerCntState);
    const gameType = useRecoilValue(gameTypeState);

    const handleIncorrectBtn = () => {
        setActions(Actions.INCORRECT);
    };

    const handleRankingBtn = () => {
        setActions(Actions.RANKING_END);
    };

    const CommonButton = ({ config }: { config: ResultButtonConfig }) => (
        <PixiButton
            position={config.position}
            defaultTexture={config.texture}
            sound={sound.find("audioIntoBtn")}
            interactive={true}
            onTouchEnd={config.handler}
        />
    );

    const buttonConfigs: { [key: string]: ResultButtonConfig } = {
        incorrect: {
            position: [0, resources.resultBg.height - 50],
            texture: resources.incorrectBtn,
            handler: handleIncorrectBtn,
        },
        ranking01: {
            position: [500, resources.resultBg.height - 50],
            texture: resources.resultRankingBtn01,
            handler: handleRankingBtn,
        },
        ranking02: {
            position: [0, resources.resultBg.height - 50],
            texture: resources.resultRankingBtn02,
            handler: handleRankingBtn,
        },
        tryAgain01: {
            position: [870, resources.resultBg.height - 50],
            texture: resources.resultTryAgainBtn01,
            handler: init,
        },
        tryAgain02: {
            position: [700, resources.resultBg.height - 50],
            texture: resources.resultTryAgainBtn02,
            handler: init,
        },
    };

    return (
        <Container position={[370, -70]} anchor={0.5}>
            {answerCnt.incorrect > 0 ? (
                gameType === "word_master" ? (
                    <>
                        <CommonButton config={buttonConfigs.incorrect} />
                        <CommonButton config={buttonConfigs.tryAgain02} />
                    </>
                ) : (
                    <>
                        <CommonButton config={buttonConfigs.incorrect} />
                        <CommonButton config={buttonConfigs.ranking01} />
                        <CommonButton config={buttonConfigs.tryAgain01} />
                    </>
                )
            ) : gameType === "word_master" ? (
                <CommonButton config={{ ...buttonConfigs.tryAgain02, position: [350, buttonConfigs.tryAgain02.position[1]] }} />
            ) : (
                <>
                    <CommonButton config={buttonConfigs.ranking02} />
                    <CommonButton config={buttonConfigs.tryAgain02} />
                </>
            )}
        </Container>
    );
};
