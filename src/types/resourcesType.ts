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
}

export interface ProblemType {
    word: any;
    correct: string;
}
