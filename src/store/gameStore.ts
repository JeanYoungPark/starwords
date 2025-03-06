import { atom } from "recoil";
import { AlienMovePositionType, IncorrectType } from "../types/resourcesType";

// 테스트 환경 여부 확인
export const isTestState = atom<boolean>({
    key: "isTestState",
    default: false
})

// 문제 인덱스
export const problemIdxState = atom<number>({
    key: "problemIdx",
    default: -1,
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

// 음소거 여부 확인
export const soundMuteState = atom<boolean>({
    key: "soundMuteState",
    default: true,
});

// 랭킹
export const rankState = atom<string | null>({
    key: "rankState",
    default: null
})