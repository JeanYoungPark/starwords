import { atom } from "recoil";
import { Actions } from "../types/actionsType";

export const actionState = atom<Actions>({
    key: "actionState",
    default: Actions.INIT,
});

/**
 * 기기 정보
 */
export const deviceOsState = atom<String | null>({
    key: "deviceOsState",
    default: null,
});

/**
 * 사용자 고유 id
 */
export const fuIdState = atom<string | null>({
    key: "fuIdState",
    default: null,
});

/**
 *
 */
export const hwCodeState = atom<number>({
    key: "hwCodeState",
    default: 0,
});

/**
 * 게임 실행 타입
 */
export const gameTypeState = atom<string | null>({
    key: "gameTypeState",
    default: null,
});

/**
 * 워드마스터에서 사용
 */
export const wordMasterSeqState = atom<string | null>({
    key: "wordMasterSeqState",
    default: null,
});

/**
 * 워드마스터에서 사용
 * 스테이지
 */
export const stageState = atom<number>({
    key: "stageState",
    default: 0,
});

/**
 * 워드마스터에서 사용
 * 언어
 */
export const langCodeState = atom<string | null>({
    key: "langCodeState",
    default: null,
});

/**
 * 클래스, normal에서 사용
 *
 */
export const fcIdState = atom<string | null>({
    key: "fcIdState",
    default: null,
});

/**
 * 클래스에서 사용
 *  클래스 아이디
 */
export const classIdState = atom<number>({
    key: "classIdState",
    default: 0,
});
