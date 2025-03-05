import { TextStyle } from "pixi.js";

export const RESULT_CORRECT_TEXT_STYLE = new TextStyle({
    fontFamily: "NotoSans-bold",
    fontSize: 50,
    fill: "rgba(255, 234, 68)",
});

export const RESULT_CORRECT_COMBO_TEXT_STYLE = new TextStyle({
    fontFamily: "NotoSans-bold",
    fontSize: 40,
    fill: "rgba(255, 234, 68)",
});

export const RESULT_RANK_TEXT_STYLE = new TextStyle({
    fontFamily: "NotoSans-bold",
    fontSize: 50,
    fill: "rgba(255, 234, 68)",
});

export const RESULT_SCORE_TEXT_STYLE = new TextStyle({
    fontFamily: "NotoSans-bold",
    fontSize: 60,
    fill: "rgba(255, 234, 68)",
});

export const INCORRECT_EN_TEXT_STYLE = new TextStyle({
    fontFamily: "NotoSans-bold",
    fontSize: 35,
});

export const INCORRECT_KO_TEXT_STYLE = new TextStyle({
    fontFamily: "NotoSans-medium",
    fontSize: 25,
    wordWrap: true,
    wordWrapWidth: 700,
});
