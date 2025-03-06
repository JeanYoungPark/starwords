import { useContext } from "react";
import { useRecoilValue } from "recoil";
import { Container, Sprite, Text } from "@pixi/react";

import { CONTENT_WIDTH } from "../../constants/commonConstants";
import { ResourceContext } from "../../context/ResourceContext";
import { gameTypeState } from "../../store/assetsStore";
import { MAIN_TEXT_STYLE, SUB_TEXT_STYLE, SUBTITLE_BG } from "../../constants/introConstants";

export const SubTitle = () => {
    const { resources, contentsData } = useContext(ResourceContext);
    const gameType = useRecoilValue(gameTypeState);

    const isWordMaster = gameType === "word_master";
    const hasMidName = Boolean(contentsData.mid_name);

    const getMainTitle = () => (isWordMaster ? contentsData.cont_title : contentsData.cont_name);
    const getSubTitle = () => (isWordMaster ? `Stage ${contentsData.stage}` : contentsData.cont_sub_name);

    return (
        <Container position={[CONTENT_WIDTH / 2, 510]}>
            <Sprite
                name='titleBg'
                texture={resources.titleBg}
                anchor={[0.5, 0]}
                position={[0, 0]}
                width={SUBTITLE_BG.WIDTH}
                height={SUBTITLE_BG.HEIGHT}
                alpha={SUBTITLE_BG.ALPHA}
            />

            <Text text={getMainTitle()} anchor={0.5} position={[0, hasMidName ? 30 : 50]} style={MAIN_TEXT_STYLE} />

            {!isWordMaster && contentsData.mid_name && (
                <Text text={contentsData.mid_name} anchor={0.5} position={[0, 80]} style={MAIN_TEXT_STYLE} />
            )}

            <Text text={getSubTitle()} anchor={0.5} position={[0, hasMidName ? 130 : 100]} style={SUB_TEXT_STYLE} />
        </Container>
    );
};
