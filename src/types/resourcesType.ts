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
