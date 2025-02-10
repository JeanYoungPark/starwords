import { atom } from "recoil";
import { AlienMovePositionType } from "../types/resourcesType";

export const alienPositionState = atom<AlienMovePositionType[]>({
    key: "alienPosition",
    default: [],
});

// 현재 콤보 갯수
export const comboCntState = atom<number>({
    key: "comboCntState",
    default: 0,
});

// 콤보 활성화 상태
// export const isComboState = atom<boolean>({
//     key: "isComboActiveState",
//     default: false,
// });

// 콤보 활성화 이후, 강제 외계인 제거 여부
export const forceAlienRemoveState = atom<boolean>({
    key: "forceAlienRemoveState",
    default: false,
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

// 콤보 활성화일 때 없앨 에일리언 인덱스
export const comboDestroyNumberState = atom<number | null>({
    key: "comboDestroyNumberState",
    default: null,
});

// 정답 갯수
export const answerCntState = atom<{ correct: number; incorrect: number }>({
    key: "answerCntState",
    default: {
        correct: 0,
        incorrect: 0,
    },
});
