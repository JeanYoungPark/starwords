import { atom } from "recoil";
import { AlienMovePositionType, IncorrectType } from "../types/resourcesType";

export const problemIdxState = atom<number>({
    key: "problemIdx",
    default: -1,
});

export const alienPositionState = atom<AlienMovePositionType[]>({
    key: "alienPosition",
    default: [],
});

// 정답 갯수
export const answerCntState = atom<{ correct: number; incorrect: number; combo: number }>({
    key: "answerCntState",
    default: {
        correct: 0,
        incorrect: 0,
        combo: 0,
    },
});

// 미정답 리스트
export const incorrectListState = atom<IncorrectType[]>({
    key: "incorrectListState",
    default: [],
});

export const soundMuteState = atom<boolean>({
    key: "soundMuteState",
    default: true,
});
