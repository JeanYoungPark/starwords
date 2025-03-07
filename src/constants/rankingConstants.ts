import { TextStyle } from "pixi.js";
import { langCodeType, RankingRefeshDataType, RankingWeekDataType } from "../types/resourcesType";

export const RANKING_TITLE_TEXT_STYLE = new TextStyle({
    fontSize: 30,
    fill: "rgba(170, 242, 246)",
});

export const RANKING_DATE_TEXT_STYLE = new TextStyle({
    fontSize: 30,
    fill: "rgba(255, 234, 68)",
});

export const RANKING_SCORE_TEXT_STYLE = new TextStyle({
    fontSize: 45,
    fill: "rgba(255, 234, 68)",
    fontWeight: "bold",
});

export const RANKING_SCORE_KR_TEXT_STYLE = new TextStyle({
    fontSize: 25,
    fill: "rgba(255, 234, 68)",
});

export const RANKING_NUM_TEXT_STYLE = new TextStyle({
    fontSize: 35,
    fill: "rgba(256,256,256)",
    fontWeight: "bold",
});

export const RANKING_USER_NAME_TEXT_STYLE = new TextStyle({
    fontSize: 30,
    fill: "rgba(256,256,256)",
});

export const RANKING_USER_SCORE_TEXT_STYLE = new TextStyle({
    fontSize: 35,
    fill: "rgba(255, 234, 68)",
    fontWeight: "bold",
});

export const langTemplates: Record<langCodeType, {
    refresh: (d: RankingRefeshDataType) => string,
    week: (w: RankingWeekDataType) => string,
    scoreUnit: string;
}> = {
    jp: {
        refresh: (d) => `リセットまで${d.days}日${d.hours}時間${d.min}分`,
        week: (w) => `${w.year}年${w.month}月第${w.week}週`,
        scoreUnit: '点',
    },
    cn: {
        refresh: (d) => `${d.days}天 ${d.hours}小时 ${d.min}分 后刷新`,
        week: (w) => `${w.year}年${w.month}月第${w.week}周`,
        scoreUnit: '分',
    },
    tw: {
        refresh: (d) => `${d.days}天 ${d.hours}小時 ${d.min}分 後重新整理`,
        week: (w) => `${w.year}年${w.month}月第${w.week}周`,
        scoreUnit: '分',
    },
    hk: {
        refresh: (d) => `${d.days}天 ${d.hours}小時 ${d.min}分 後重新整理`,
        week: (w) => `${w.year}年${w.month}月第${w.week}周`,
        scoreUnit: '分',
    },
    default: {
        refresh: (d) => `초기화까지 ${d.days}일 ${d.hours}시간 ${d.min}분 남음`,
        week: (w) => `${w.year}년 ${w.month}월 ${w.week}주차`,
        scoreUnit: '점',
    }
};