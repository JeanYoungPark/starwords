import { Container, Sprite, Text } from "@pixi/react";
import { useContext } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { getWeekText } from "../../util";
import { RANKING_DATE_TEXT_STYLE } from "../../constants/rankingConstants";

export const DateTitle = () => {
    const { resources } = useContext(ResourceContext);

    return (
        <Container position={[0, 100]}>
            <Sprite texture={resources.rankingPrize} position={[0, 0]} />
            <Sprite texture={resources.rankingTitle} position={[150, 50]} />
            <Text text={getWeekText()} position={[160, 10]} style={RANKING_DATE_TEXT_STYLE} />
        </Container>
    );
};
