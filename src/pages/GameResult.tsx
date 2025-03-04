import { Container, PixiRef, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

import { ResourceContext } from "../context/ResourceContext";
import { gameTypeState } from "../store/assetsStore";
import { answerCntState } from "../store/gameStore";
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
import { UserDataType } from "../types/resourcesType";
import { Buttons } from "../components/result/Buttons";

export const GameResult = () => {
    const containerRef = useRef<PixiRef<typeof Container>>(null);
    const { resources } = useContext(ResourceContext);
    const answerCnt = useRecoilValue(answerCntState);
    const gameType = useRecoilValue(gameTypeState);
    const [resultImg, setResultImg] = useState<Texture<Resource>>(resources.tryAgain);
    const [rankNo, setRankNo] = useState<string>("");
    const [userData, setUserData] = useState<UserDataType | null>(null);

    const getUserInfoData = async () => {
        const userData = await getUserData();
        console.log(userData)
        setUserData(userData);
    };

    useEffect(() => {
        sound.stop("gameBgm");
        sound.play("result");

        // TODO: 주석해제 후 post 되는지 확인
        // const sendResult = async () => {
        //     const score = answerCnt.correct * 100 + answerCnt.combo * 200;
        //     const correctCnt = answerCnt.correct;
        //     const incorrectCnt = answerCnt.incorrect;
        //     const comboScore = answerCnt.combo * 200;
        //     const res = await postGameData({ score, correctCnt, comboScore, incorrectCnt });
        //     setRankNo(res.rank_no);
        // };

        if (gameType !== "word_master") getUserInfoData();
        // sendResult();
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
                <Buttons />
            </Container>

            <Sprite texture={resultImg} anchor={0.5} position={[1920 / 2, 130]} scale={0.8} />
        </Container>
    );
};
