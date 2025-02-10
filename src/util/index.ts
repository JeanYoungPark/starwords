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
 * 콤보 상태에서 없앨 객체 index 얻어오기
 */
export const destroyProblemIdx = (aliens: ProblemType[]) => {
    const incorrectAliens = aliens.filter((data) => data.correct === "N");
    const removeRandom = Math.floor(Math.random() * incorrectAliens.length);

    const selectedIncorrectAlien = incorrectAliens[removeRandom];
    const originalIndex = aliens.indexOf(selectedIncorrectAlien);
    return originalIndex;
};

export const getFrameNumber = (num: number) => (num < 10 ? `0${num}` : num);
