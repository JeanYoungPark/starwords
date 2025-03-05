import { atom } from "recoil";
import { Actions, AlienActions, GameActions } from "../types/actionsType";

// 컴포넌트 상태 관리
export const actionState = atom<Actions>({
    key: "actionState",
    default: Actions.INIT,
});

// 게임 컴포넌트내에서 상태 관리
export const gameActionState = atom<GameActions>({
    key: "gameActionState",
    default: GameActions.STAND_BY,
});

// 외계인 상태 관리
export const AlienActionState = atom<AlienActions>({
    key: "AlienActionState",
    default: AlienActions.STAND_BY,
});

/**
 * 국가 코드
 */
export const langCodeState = atom<string | null>({
    key: "langCodeState",
    default: null,
});

/**
 * 기기 정보
 */
export const deviceOsState = atom<String | null>({
    key: "deviceOsState",
    default: null,
});

/**
 * 게임 실행 타입
 */
export const gameTypeState = atom<string | null>({
    key: "gameTypeState",
    default: null,
});
