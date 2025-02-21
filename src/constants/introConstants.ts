import { TextStyle } from "pixi.js";
import { CONTENT_WIDTH } from "./commonConstants";

export const SUBTITLE_BG = {
    WIDTH: 1358,
    HEIGHT: 150,
    ALPHA: 0.5,
};

export const MAIN_TEXT_STYLE = new TextStyle({
    fontFamily: "NotoSans-bold",
    fontSize: 34,
    fill: "rgba(170, 242, 246)",
});

export const SUB_TEXT_STYLE = new TextStyle({
    fontFamily: "NotoSans-medium",
    fontSize: 34,
    fill: "rgba(170, 242, 246)",
});

export const TITLE_ANIMATION = {
    INITIAL: {
        duration: 2,
        ease: "elastic.out(1, 0.3)",
        scale: {
            start: 0,
            end: 1,
        },
    },
    LOOP: {
        duration: 2,
        scale: 1.05,
        delay: 1.5,
        ease: "sine",
    },
    POSITION: {
        x: CONTENT_WIDTH / 2,
        y: 300,
    },
};

export const RANKING_BUTTON = {
    POSITION: {
        y: 890,
        start: 1860,
        end: 980,
    },
    ANIMATION: {
        duration: 0.7,
        ease: "sign",
    },
};

export const START_BUTTON = {
    POSITION: {
        y: 750,
        start: 0,
        end: 980,
    },
    ANIMATION: {
        duration: 0.7,
        ease: "sign",
    },
};

export const BGM_BUTTON = {
    INITIAL_VOLUME: 0.5,
    ICON: {
        POSITION: {
            x: 60,
            y: 70,
        },
    },
    TEXT: {
        POSITION: {
            x: 40,
            y: 130,
        },
        SCALE: 0.7,
    },
};
