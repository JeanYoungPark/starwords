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

// 점수
export const scoreState = atom<number>({
    key: "scoreState",
    default: 0,
});

// 콤보 추가 점수
export const comboScoreState = atom<number>({
    key: "comboScoreState",
    default: 0,
});

// 정답 갯수
export const answerCntState = atom<{ correct: number; incorrect: number }>({
    key: "answerCntState",
    default: {
        correct: 0,
        incorrect: 0,
    },
});

// 미정답 리스트
export const incorrectListState = atom<IncorrectType[]>({
    key: "incorrectListState",
    default: [],
});
