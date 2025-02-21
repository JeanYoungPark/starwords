import { Container, PixiRef, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ResourceContext } from "../context/ResourceContext";
import { actionState, gameTypeState } from "../store/assetsStore";
import { Actions } from "../types/actionsType";
import { answerCntState } from "../store/gameStore";
import { PixiButton } from "../components/common/PixiButton";
import { GameContext } from "../context/GameContext";
import {
    RESULT_CORRECT_COMBO_TEXT_STYLE,
    RESULT_CORRECT_TEXT_STYLE,
    RESULT_RANK_TEXT_STYLE,
    RESULT_SCORE_TEXT_STYLE,
} from "../constants/resultContants";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../constants/commonConstants";
import { numberComma } from "../util";
import { Resource, Texture } from "pixi.js";
import { postGameData } from "../apis/postData";
import { sound } from "@pixi/sound";
import { getUserData } from "../apis/getData";
import { ResultButtonConfig, UserDataType } from "../types/resourcesType";

export const GameResult = () => {
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const { resources } = useContext(ResourceContext);
    const { init } = useContext(GameContext);
    const answerCnt = useRecoilValue(answerCntState);
    const gameType = useRecoilValue(gameTypeState);
    const setActions = useSetRecoilState(actionState);
    const [resultImg, setResultImg] = useState<Texture<Resource>>(resources.tryAgain);
    const [rankNo, setRankNo] = useState<string>("");
    const [userData, setUserData] = useState<UserDataType | null>(null);

    const getUserInfoData = async () => {
        const userData = await getUserData();
        setUserData(userData);
    };

    useEffect(() => {
        sound.stop("gameBgm");
        sound.play("result");

        // TODO: 주석해제 후 post 되는지 확인
        const sendResult = async () => {
            const score = answerCnt.correct * 100 + answerCnt.combo * 200;
            const correctCnt = answerCnt.correct;
            const incorrectCnt = answerCnt.incorrect;
            const comboScore = answerCnt.combo * 200;
            const res = await postGameData({ score, correctCnt, comboScore, incorrectCnt });
            setRankNo(res.rank_no);
        };

        if (gameType !== "word_master") getUserInfoData();
        sendResult();
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

    const CommonButton = ({ config }: { config: ResultButtonConfig }) => (
        <PixiButton
            position={config.position}
            defaultTexture={config.texture}
            sound={sound.find("audioIntoBtn")}
            interactive={true}
            onTouchEnd={config.handler}
        />
    );

    return (
        <Container ref={containerRef}>
            <Sprite texture={resources.bg} anchor={0.5} position={[CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2]} />
            <Sprite texture={resources.gamePlanet01} position={[-50, 0]} />
            <Sprite texture={resources.gamePlanet02} position={[1500, 720]} />

            <Container position={[CONTENT_WIDTH / 2 - resources.resultBg.width / 2, 280]}>
                <Sprite texture={resources.resultBg} position={[0, 0]}>
                    <Sprite
                        texture={userData?.badge_img_url ? userData.badge_img_url : resources.profile}
                        scale={0.5}
                        position={[resources.resultBg.width - 640, 130]}
                    />
                    <Text text={`${numberComma(answerCnt.correct)}`} style={RESULT_CORRECT_TEXT_STYLE} position={[550, 130]} anchor={0.5} />
                    <Text text={`${numberComma(answerCnt.incorrect)}`} style={RESULT_CORRECT_TEXT_STYLE} position={[550, 280]} anchor={0.5} />
                    <Text
                        text={`${numberComma(answerCnt.combo * 200)} 점`}
                        style={RESULT_CORRECT_COMBO_TEXT_STYLE}
                        position={[550, 430]}
                        anchor={0.5}
                    />

                    <Text
                        text={Number(rankNo) > 0 ? `${rankNo} 위` : "-"}
                        style={RESULT_RANK_TEXT_STYLE}
                        position={[resources.resultBg.width - 590, 380]}
                        anchor={0.5}
                    />
                    <Text
                        text={`${numberComma(answerCnt.correct * 100 + answerCnt.combo * 200)} 점`}
                        style={RESULT_SCORE_TEXT_STYLE}
                        position={[resources.resultBg.width - 250, 380]}
                        anchor={0.5}
                    />
                </Sprite>
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
            </Container>

            <Sprite texture={resultImg} anchor={0.5} position={[1920 / 2, 130]} scale={0.8} />
        </Container>
    );
};
