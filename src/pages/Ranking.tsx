import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";

import { actionState } from "../store/assetsStore";
import { Actions } from "../types/actionsType";
import _ from "lodash";
import { GameContext } from "../context/GameContext";
import { RankingComponent } from "../components/ranking/RankingComponent";

export const Ranking = () => {
    const { init } = useContext(GameContext);
    const [actions, setAction] = useRecoilState(actionState);

    useEffect(()=>{
            console.log(actions)
        },[])

    const onTouchEnd = () => {
        if(actions === Actions.RANKING_END){
            setAction(Actions.GAME_FINISH);
        } else{
            setAction(Actions.INTRO);
            init();
        }
    };

    return (
        <RankingComponent onTouchEnd={onTouchEnd}/>
    );
};
