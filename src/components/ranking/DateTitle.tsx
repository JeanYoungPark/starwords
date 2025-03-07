import { Container, Sprite, Text } from "@pixi/react";
import { useContext } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { getWeekInfo } from "../../util";
import { langTemplates, RANKING_DATE_TEXT_STYLE } from "../../constants/rankingConstants";
import { langCodeState } from "../../store/assetsStore";
import { useRecoilValue } from "recoil";

export const DateTitle = () => {
    const { resources } = useContext(ResourceContext);
    const langCode = useRecoilValue(langCodeState);

    const weekText = () => {
        const weekInfo = getWeekInfo();
        return langTemplates[langCode ?? 'default'].week(weekInfo);
    }

    const titleImg = () => {
        if(langCode === 'jp') return resources.rankingTitleJp;
        if(langCode === 'cn') return resources.rankingTitleCn;
        if(langCode === 'tw' || langCode === 'hk') return resources.rankingTitleTw;
        return resources.rankingTitle;
    }

    return (
        <Container position={[0, 100]}>
            <Sprite texture={resources.rankingPrize} position={[0, 0]} />
            <Sprite texture={titleImg()} position={[150, 50]} />
            <Text text={weekText()} position={[160, 10]} style={RANKING_DATE_TEXT_STYLE} />
        </Container>
    );
};
