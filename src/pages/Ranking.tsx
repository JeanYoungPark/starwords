import { Container, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useState } from "react";
import { TextStyle, Texture } from "pixi.js";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ResourceContext } from "../context/ResourceContext";
import { actionState, gameTypeState } from "../store/assetsStore";
import { Actions } from "../types/actionsType";
import { PixiButton } from "../components/common/PixiButton";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../constants/commonConstants";
import { getRankingData, getUserData } from "../apis/getData";
import { RankingType, UserDataType } from "../types/resourcesType";
import _ from "lodash";
import { getTimeRemaining, numberComma, getWeekText } from "../util";
import { Loading } from "../components/Loading";
import {
    RANKING_DATE_TEXT_STYLE,
    RANKING_NUM_TEXT_STYLE,
    RANKING_SCORE_KR_TEXT_STYLE,
    RANKING_SCORE_TEXT_STYLE,
    RANKING_TITLE_TEXT_STYLE,
    RANKING_USER_NAME_TEXT_STYLE,
    RANKING_USER_SCORE_TEXT_STYLE,
} from "../constants/rankingConstants";
import { sound } from "@pixi/sound";

export const Ranking = () => {
    const { resources, contentsData } = useContext(ResourceContext);
    const gameType = useRecoilValue(gameTypeState);
    const setAction = useSetRecoilState(actionState);
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [rankingArr, setRankingArr] = useState<RankingType[][]>([]);
    const [rankingUpdateTime, setRankingUpdateTime] = useState<string>("");
    const [page, setPage] = useState<number>(0);

    const isWordMaster = gameType === "word_master";
    const hasMidName = Boolean(contentsData.mid_name);
    const getMainTitle = () => (isWordMaster ? contentsData.cont_title : contentsData.cont_name);
    const getSubTitle = () => (isWordMaster ? `Stage ${contentsData.stage}` : contentsData.cont_sub_name);

    const getData = async () => {
        const rankingData = await getRankingData();
        console.log(rankingData);
        setRankingArr(_.chunk(rankingData.rank_arr, 10));
        setRankingUpdateTime(rankingData.update_time);
    };

    const getUserInfoData = async () => {
        const userData = await getUserData();
        setUserData(userData);
    };

    useEffect(() => {
        if (gameType !== "word_master") getUserInfoData();
        getData();
    }, []);

    const handleStartGuide = () => {
        setAction(Actions.GUIDE);
    };

    const onTouchEnd = () => {
        setAction(Actions.INTRO);
    };

    if (!rankingArr.length) return <Loading />;

    return (
        <Container>
            <Sprite texture={resources.bg} anchor={0.5} position={[CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2]} />

            {rankingArr.length > 1 && (
                <>
                    {page > 0 && (
                        <Sprite
                            texture={resources.incorrectLeftBtn}
                            anchor={0.5}
                            position={[230, CONTENT_HEIGHT / 2 + 60]}
                            interactive={true}
                            onclick={() => setPage((prev) => prev - 1)}
                        />
                    )}
                    {page < rankingArr.length - 1 && (
                        <Sprite
                            texture={resources.incorrectRightBtn}
                            anchor={0.5}
                            position={[CONTENT_WIDTH - 250, CONTENT_HEIGHT / 2 + 60]}
                            interactive={true}
                            onclick={() => setPage((prev) => prev + 1)}
                        />
                    )}
                </>
            )}

            <Container position={[230, 100]}>
                <Container>
                    <Text text={getMainTitle()} position={[0, hasMidName ? -30 : 0]} style={RANKING_TITLE_TEXT_STYLE} />
                    {!isWordMaster && contentsData.mid_name && (
                        <Text text={contentsData.mid_name} position={[0, 10]} style={RANKING_TITLE_TEXT_STYLE} />
                    )}
                    <Text text={getSubTitle()} position={[0, hasMidName ? 50 : 40]} style={RANKING_TITLE_TEXT_STYLE} />
                </Container>

                <Container>
                    <Container position={[0, 100]}>
                        <Sprite texture={resources.rankingPrize} position={[0, 0]} />
                        <Sprite texture={resources.rankingTitle} position={[150, 50]} />
                        <Text text={getWeekText()} position={[160, 10]} style={RANKING_DATE_TEXT_STYLE} />
                    </Container>
                    <Container position={[870, 100]}>
                        <Sprite texture={resources.rankingScoreBg} position={[0, 0]} width={506} height={130} />
                        <Sprite texture={resources.rankingProfile} position={[30, 22]} scale={0.45} />
                        <Text
                            text={numberComma(Number(userData?.best_score_week) || 0)}
                            anchor={[0.5, 0.5]}
                            position={[280, 65]}
                            style={RANKING_SCORE_TEXT_STYLE}
                        />

                        <Text text='점' anchor={0.5} position={[460, 65]} style={RANKING_SCORE_KR_TEXT_STYLE} />
                    </Container>
                </Container>
            </Container>

            <Sprite texture={resources.rankingBg} position={[CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2 + 100]} scale={0.75} anchor={0.5}>
                <Container position={[-CONTENT_WIDTH / 2 + 50, -380]}>
                    {rankingArr[page]?.map((item, idx) => {
                        const split = 5;
                        const rankResource = item.rank_no === "1" ? resources.gold : item.rank_no === "2" ? resources.silver : resources.bronze;

                        const leftPosition = idx >= split ? 830 : 0;
                        const topPosition = (idx % split) * 155;

                        return (
                            <Container key={idx} position={[leftPosition, topPosition]}>
                                {!page && idx < 3 ? (
                                    <Sprite texture={rankResource} position={[150, 40]} scale={0.75} />
                                ) : (
                                    <Text text={`${idx + 1}`} position={[170, 50]} style={RANKING_NUM_TEXT_STYLE} />
                                )}
                                <Sprite
                                    texture={item.badge_img_url ? Texture.from(item.badge_img_url) : resources.rankingProfile}
                                    position={[230, 20]}
                                    scale={0.5}
                                />
                                <Text text={item.nickname} position={[345, 50]} style={RANKING_USER_NAME_TEXT_STYLE} />
                                <Container position={[(resources.rankingBg.width * 0.75) / 2 - resources.rankingUserScoreBg.width - 30, 40]}>
                                    <Sprite texture={resources.rankingUserScoreBg} position={[180, 0]}>
                                        <Text
                                            text={`${numberComma(Number(item.score))} 점`}
                                            position={[40, 7]}
                                            style={RANKING_USER_SCORE_TEXT_STYLE}
                                        />
                                    </Sprite>
                                </Container>
                            </Container>
                        );
                    })}
                </Container>
            </Sprite>

            <Text
                text={`초기화까지 ${getTimeRemaining(rankingUpdateTime)} 남음`}
                position={[220, 970]}
                style={
                    new TextStyle({
                        fontSize: 20,
                        fill: "rgba(172, 169, 182)",
                    })
                }
            />

            <PixiButton name='back' position={[60, 70]} defaultTexture={resources.back} sound={sound.find("audioIntoBtn")} onTouchEnd={onTouchEnd} />

            <PixiButton position={[1860, 1020]} defaultTexture={resources.help} sound={sound.find("audioIntoBtn")} onTouchEnd={handleStartGuide} />
        </Container>
    );
};
