import React, { useContext } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { Container, Sprite, Text } from "@pixi/react";
import { RANKING_NUM_TEXT_STYLE, RANKING_USER_NAME_TEXT_STYLE, RANKING_USER_SCORE_TEXT_STYLE } from "../../constants/rankingConstants";
import { Texture } from "pixi.js";
import { numberComma } from "../../util";
import { RankingType } from "../../types/resourcesType";

export const List = ({ rankingArr, page }: { rankingArr: RankingType[][]; page: number }) => {
    const { resources } = useContext(ResourceContext);

    return (
        <>
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
                                <Text text={`${numberComma(Number(item.score))} 점`} position={[40, 7]} style={RANKING_USER_SCORE_TEXT_STYLE} />
                            </Sprite>
                        </Container>
                    </Container>
                );
            })}
        </>
    );
};
