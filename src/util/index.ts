import { ProblemType } from "../types/resourcesType";

/*
 * 모바일 체크
 */
export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
};

/**
 * 쿠키 정보 얻어오기
 */
export const getCookie = (name: string): string | null => {
    const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`));
    return matches ? decodeURIComponent(matches[1]) : null;
};

/**
 * api 쿠키 얻어오기
 */
export const getRequiredCookies = (keys: string[]) => {
    const values = keys.map((key) => getCookie(key));
    // if (values.some((val) => !val)) {
    //     throw new Error(`${keys.join(", ")} 값이 존재하지 않습니다.`);
    // }
    return values;
};

/**
 * 콤보 상태에서 없앨 객체 index 얻어오기
 */
export const destroyProblemIdx = (aliens: ProblemType[]) => {
    const incorrectAliens = aliens.filter((data) => data.correct === "N");
    const removeRandom = Math.floor(Math.random() * incorrectAliens.length);

    const selectedIncorrectAlien = incorrectAliens[removeRandom];
    const originalIndex = aliens.indexOf(selectedIncorrectAlien);
    return originalIndex;
};

/**
 * 프레임 숫자 세팅
 */
export const getFrameNumber = (num: number) => (num < 10 ? `0${num}` : num);

/**
 * 자리수 콤마 찍기
 */
export const numberComma = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getWeekText = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const firstDayWeekday = firstDay.getDay();

    const week = Math.ceil((date.getDate() + firstDayWeekday) / 7);

    return `${year}년 ${month + 1}월 ${week}주차`;
};

export const getTimeRemaining = (updateDate: string) => {
    const now = new Date();
    const targetDate = new Date(updateDate);
    const timeDiff = targetDate.getTime() - now.getTime();

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / 1000) % 24);

    return `${days}일 ${hours}시간 ${minutes}분 남음`;
};
