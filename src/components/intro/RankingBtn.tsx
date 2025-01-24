import { RefObject, useContext, useEffect, useRef } from "react";
import { PixiButton } from "../PixiButton";
import { ResourceContext } from "../../context/ResourceContext";
import { useRecoilState } from "recoil";
import { actionState } from "../../store/assetsStore";
import { Actions } from "../../types/actionsType";
import { Container, PixiRef } from "@pixi/react";

export const RankingBtn = () => {
    const { resources, sounds } = useContext(ResourceContext);
    const [action, setAction] = useRecoilState(actionState);

    const rankingBtnRef = useRef<PixiRef<typeof Container>>(null);

    const animateRankingButton = ({ rankingBtnRef }: { rankingBtnRef: RefObject<PixiRef<typeof Container>> }) => {
        if (!rankingBtnRef.current) return;

        const rankingBtn = rankingBtnRef.current.getChildByName("startBtn");

        gsap.fromTo(rankingBtn, { x: 1600 }, { x: 980, duration: 0.7, ease: "sign" });
    };

    const handleRanking = () => {
        setAction(Actions.RANKING);
    };

    useEffect(() => {
        animateRankingButton({ rankingBtnRef });
    }, [rankingBtnRef]);

    return (
        <Container ref={rankingBtnRef}>
            <PixiButton
                name='rankingBtn'
                position={[720, 890]}
                defaultTexture={resources.rankingBtn}
                sound={sounds.audioIntoBtn}
                onTouchEnd={handleRanking}
            />
        </Container>
    );
};
