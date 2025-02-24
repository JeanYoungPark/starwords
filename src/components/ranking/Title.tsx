import { Container, Text } from "@pixi/react";
import React, { useContext } from "react";
import { RANKING_TITLE_TEXT_STYLE } from "../../constants/rankingConstants";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilValue } from "recoil";
import { gameTypeState } from "../../store/assetsStore";

export const Title = () => {
    const { contentsData } = useContext(ResourceContext);
    const gameType = useRecoilValue(gameTypeState);

    const isWordMaster = gameType === "word_master";
    const hasMidName = Boolean(contentsData.mid_name);
    const getMainTitle = () => (isWordMaster ? contentsData.cont_title : contentsData.cont_name);
    const getSubTitle = () => (isWordMaster ? `Stage ${contentsData.stage}` : contentsData.cont_sub_name);

    return (
        <Container>
            <Text text={getMainTitle()} position={[0, hasMidName ? -30 : 0]} style={RANKING_TITLE_TEXT_STYLE} />
            {!isWordMaster && contentsData.mid_name && <Text text={contentsData.mid_name} position={[0, 10]} style={RANKING_TITLE_TEXT_STYLE} />}
            <Text text={getSubTitle()} position={[0, hasMidName ? 50 : 40]} style={RANKING_TITLE_TEXT_STYLE} />
        </Container>
    );
};
