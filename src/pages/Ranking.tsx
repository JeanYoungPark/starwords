import { Container, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useState } from "react";
import { TextStyle } from "pixi.js";
import { useRecoilState, useRecoilValue } from "recoil";

import { ResourceContext } from "../context/ResourceContext";
import { actionState, gameTypeState, langCodeState } from "../store/assetsStore";
import { Actions } from "../types/actionsType";
import { PixiButton } from "../components/common/PixiButton";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../constants/commonConstants";
import { getRankingData } from "../apis/getData";
import { LANG_CODES, LangCodeType, RankingType } from "../types/resourcesType";
import _ from "lodash";
import { getTimeRemaining } from "../util";
import { sound } from "@pixi/sound";
import { Buttons } from "../components/ranking/Buttons";
import { Title } from "../components/ranking/Title";
import { DateTitle } from "../components/ranking/DateTitle";
import { Score } from "../components/ranking/Score";
import { List } from "../components/ranking/List";
import { Loading } from "../components/ranking/Loading";
import { langTemplates } from "../constants/rankingConstants";

export const Ranking = () => {
    const { resources } = useContext(ResourceContext);
    const gameType = useRecoilValue(gameTypeState);
    const [action, setAction] = useRecoilState(actionState);
    const langCode = useRecoilValue(langCodeState);

    const [rankingArr, setRankingArr] = useState<RankingType[][]>([]);
    const [rankingUpdateTime, setRankingUpdateTime] = useState<string>("");
    const [rankingCode, setRankingCode] = useState<number>(NaN);
    const [page, setPage] = useState<number>(0);

    const getData = async () => {
        const rankingData = await getRankingData();
        setRankingCode(rankingData.code);
        setRankingArr(_.chunk(rankingData.rank_arr, 10));
        setRankingUpdateTime(rankingData.update_time);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleStartGuide = () => {
        setAction(Actions.GUIDE);
    };

    const onTouchEnd = () => {
        if(action === Actions.RANKING){
            setAction(Actions.INTRO);
        }else{
            setAction(Actions.GAME_FINISH);
        }
    };

    const handlePageBtn = (val: number) => {
        setPage((prev) => prev + val);
    };

    const refreshText = () => {
        const dateInfo = getTimeRemaining(rankingUpdateTime);
        
        const validLangCode = LANG_CODES.includes(langCode as LangCodeType) ? langCode as LangCodeType : 'default';
        return langTemplates[validLangCode].refresh(dateInfo);
        
    }
    
    return (
        <Container>
            <Sprite texture={resources.bg} anchor={0.5} position={[CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2]} />

            <Container position={[230, 100]}>
                <Title />
                <Container>
                    <DateTitle />
                    <Score />
                </Container>
            </Container>

            <Sprite texture={resources.rankingBg} position={[CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2 + 100]} scale={0.75} anchor={0.5}>
                <Container position={[-CONTENT_WIDTH / 2 + 50, -380]}>
                    <List rankingArr={rankingArr} page={page} />
                </Container>
            </Sprite>

            {gameType !== 'class' && (
                <Text
                    text={refreshText()}
                    position={[220, 970]}
                    style={
                        new TextStyle({
                            fontSize: 20,
                            fill: "rgba(172, 169, 182)",
                        })
                    }
                />
            )}

            <Buttons rankingArrLength={rankingArr.length} page={page} handlePageBtn={handlePageBtn} />
            <PixiButton name='back' position={[60, 70]} defaultTexture={resources.back} sound={sound.find("audioIntoBtn")} onTouchEnd={onTouchEnd} />
            <PixiButton position={[1860, 1020]} defaultTexture={resources.help} sound={sound.find("audioIntoBtn")} onTouchEnd={handleStartGuide} />

            {!rankingCode && <Loading />}
        </Container>
    );
};
