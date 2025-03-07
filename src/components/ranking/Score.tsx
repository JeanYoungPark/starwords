import { Container, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useState } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { numberComma } from "../../util";
import { langTemplates, RANKING_SCORE_KR_TEXT_STYLE, RANKING_SCORE_TEXT_STYLE } from "../../constants/rankingConstants";
import { getUserData } from "../../apis/getData";
import { UserDataType } from "../../types/resourcesType";
import { useRecoilValue } from "recoil";
import { gameTypeState, langCodeState } from "../../store/assetsStore";

export const Score = () => {
    const { resources } = useContext(ResourceContext);
    const gameType = useRecoilValue(gameTypeState);
    const langCode = useRecoilValue(langCodeState);
    const [userData, setUserData] = useState<UserDataType | null>(null);

    const getUserInfoData = async () => {
        const userData = await getUserData();
        setUserData(userData);
    };

    useEffect(() => {
        if (gameType !== "word_master") getUserInfoData();
    }, []);

    return (
        <Container position={[870, 100]}>
            <Sprite texture={resources.rankingScoreBg} position={[0, 0]} width={506} height={130} />
            <Sprite texture={resources.rankingProfile} position={[30, 22]} scale={0.45} />
            <Text
                text={numberComma(Number(userData?.best_score_week) || 0)}
                anchor={[0.5, 0.5]}
                position={[280, 65]}
                style={RANKING_SCORE_TEXT_STYLE}
            />

            <Text text={langTemplates[langCode ?? 'default'].scoreUnit} anchor={0.5} position={[460, 65]} style={RANKING_SCORE_KR_TEXT_STYLE} />
        </Container>
    );
};
