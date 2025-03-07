import { Texture } from "pixi.js";

export type langCodeType = "jp" | "cn" | "tw" | "hk" | "default";

export interface Resource {
    [key: string]: any;
}

export interface WordType {
    sound_url: string;
    voca_id: string;
    word_en: string;
    word_ko: string;
}

export interface AlienMovePositionType {
    x: number;
    y: number;
    direction_x: string;
    direction_y: string;
}

export interface ProblemType {
    word: any;
    correct: string;
}

export interface IncorrectType {
    [key: string]: {
        idx: number;
        cnt: number;
        word_ko: string;
        word_en: string;
        sound_url: any;
    };
}

export interface RankingType {
    badge_img_url: string;
    fu_id: string;
    last_updated_date: string;
    nickname: string;
    rank_no: string;
    score: string;
}

export interface UserDataType {
    badge_img_url: string;
    best_combo_num: string;
    best_score: string;
    best_score_week: string;
    bg_sound_yn: string;
    effect_sound_yn: string;
    fu_id: string;
    gold_balance: string;
    nickname: string;
    playable_yn: string;
    total_gold_balance: null;
    total_playcount: string;
    upd_date: string;
}

export interface ResultButtonConfig {
    position: [number, number];
    texture: Texture;
    handler: () => void;
}

export interface RankingRefeshDataType {
    days: number,
    hours: number,
    min: number
}

export interface RankingWeekDataType {
    year: number,
    month: number,
    week: number
}