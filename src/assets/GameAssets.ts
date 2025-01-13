const commonImgPath = "images/";
const iconImgPath = "images/icons/";
const introImgPath = "images/intro/";
const guideImgPath = "images/guide/";
const rankingImgPath = "images/ranking/";
const gameImgPath = "images/game/";
const audioPath = "audio/";
const fontPath = "fonts/";

const assets = [
    //common
    { alias: "bg", src: `${commonImgPath}background.png` },
    { alias: "soundOn", src: `${iconImgPath}sound_on.png` },
    { alias: "soundOff", src: `${iconImgPath}sound_off.png` },
    { alias: "soundText", src: `${iconImgPath}sound_text.png` },
    { alias: "close", src: `${iconImgPath}close.png` },
    { alias: "back", src: `${iconImgPath}back.png` },
    { alias: "reload", src: `${iconImgPath}reload.png` },

    // intro
    { alias: "bottomLight", src: `${introImgPath}bottom_light.png` },
    { alias: "topLight", src: `${introImgPath}top_light.png` },
    { alias: "planet01", src: `${introImgPath}planet_01.png` },
    { alias: "planet02", src: `${introImgPath}planet_02.png` },
    { alias: "title", src: `${introImgPath}intro_title.png` },
    { alias: "rocket", src: `${introImgPath}rocket.png` },
    { alias: "spaceship", src: `${introImgPath}spaceship.png` },
    { alias: "titleBg", src: `${introImgPath}titleBg.png` },
    { alias: "startBtn", src: `${introImgPath}startBtn.png` },
    { alias: "rankingBtn", src: `${introImgPath}rankingBtn.png` },
    { alias: "help", src: `${iconImgPath}help.png` },

    //guide
    { alias: "guide", src: `${guideImgPath}guide.png` },
    { alias: "planet03", src: `${guideImgPath}planet_01.png` },
    { alias: "planet04", src: `${guideImgPath}planet_02.png` },
    { alias: "planet05", src: `${guideImgPath}planet_03.png` },
    { alias: "rocket01", src: `${guideImgPath}rocket_01.png` },

    // ranking
    { alias: "rankingBg", src: `${rankingImgPath}ranking_bg.png` },
    { alias: "rankingPrize", src: `${rankingImgPath}prize.png` },
    { alias: "rankingTitle", src: `${rankingImgPath}title.png` },
    { alias: "rankingProfile", src: `${rankingImgPath}profile.png` },
    { alias: "rankingScoreBg", src: `${rankingImgPath}score_bg.png` },
    { alias: "gold", src: `${rankingImgPath}gold.png` },
    { alias: "rankingUserScoreBg", src: `${rankingImgPath}user_score_bg.png` },

    // game
    { alias: "gamePlanet01", src: `${gameImgPath}planet_01.png` },
    { alias: "gamePlanet02", src: `${gameImgPath}planet_02.png` },
    { alias: "gameBar", src: `${gameImgPath}bar.png` },
    { alias: "gameBarBg", src: `${gameImgPath}bar_bg.png` },
    { alias: "gameScoreBg", src: `${gameImgPath}score_board.png` },
    { alias: "comboBall", src: `${gameImgPath}combo_ball.png` },
    { alias: "comboBall01", src: `${gameImgPath}combo_ball_01.png` },
    { alias: "comboBall02", src: `${gameImgPath}combo_ball_02.png` },
    { alias: "comboBall03", src: `${gameImgPath}combo_ball_03.png` },
    { alias: "comboBall04", src: `${gameImgPath}combo_ball_04.png` },
    { alias: "maxComboBall", src: `${gameImgPath}max_combo_ball.png` },
    { alias: "maxComboBallOn", src: `${gameImgPath}max_combo_ball_on.png` },
    { alias: "alien01", src: `${gameImgPath}alien_01.png` },
    { alias: "alien02", src: `${gameImgPath}alien_02.png` },
    { alias: "alien03", src: `${gameImgPath}alien_03.png` },
    { alias: "alien04", src: `${gameImgPath}alien_04.png` },
    { alias: "alien05", src: `${gameImgPath}alien_05.png` },
    { alias: "gauge", src: `${gameImgPath}gauge.png` },
    { alias: "gauge2", src: `${gameImgPath}gauge2.png` },
    { alias: "destroy01", src: `${gameImgPath}destroy_01.png` },
    { alias: "destroy02", src: `${gameImgPath}destroy_02.png` },
    { alias: "destroy03", src: `${gameImgPath}destroy_03.png` },
    { alias: "destroy04", src: `${gameImgPath}destroy_04.png` },
    { alias: "destroy05", src: `${gameImgPath}destroy_05.png` },
    { alias: "destroy06", src: `${gameImgPath}destroy_06.png` },
    { alias: "destroy07", src: `${gameImgPath}destroy_07.png` },
    { alias: "destroy08", src: `${gameImgPath}destroy_08.png` },
    { alias: "destroy09", src: `${gameImgPath}destroy_09.png` },
    { alias: "destroy10", src: `${gameImgPath}destroy_10.png` },
    { alias: "destroy11", src: `${gameImgPath}destroy_11.png` },
    { alias: "destroy12", src: `${gameImgPath}destroy_12.png` },
    { alias: "destroy13", src: `${gameImgPath}destroy_13.png` },
    { alias: "incorrect01", src: `${gameImgPath}incorrect_01.png` },
    { alias: "incorrect02", src: `${gameImgPath}incorrect_02.png` },
    { alias: "incorrect03", src: `${gameImgPath}incorrect_03.png` },
    { alias: "incorrect04", src: `${gameImgPath}incorrect_04.png` },
    { alias: "incorrect05", src: `${gameImgPath}incorrect_05.png` },
    { alias: "incorrect06", src: `${gameImgPath}incorrect_06.png` },
    { alias: "incorrect07", src: `${gameImgPath}incorrect_07.png` },
    { alias: "incorrect08", src: `${gameImgPath}incorrect_08.png` },
    { alias: "combo01", src: `${gameImgPath}combo_cnt_01.png` },
    { alias: "combo02", src: `${gameImgPath}combo_cnt_02.png` },
    { alias: "combo03", src: `${gameImgPath}combo_cnt_03.png` },
    { alias: "combo04", src: `${gameImgPath}combo_cnt_04.png` },
    { alias: "combo05", src: `${gameImgPath}combo_max.png` },
    { alias: "comboBallText01", src: `${gameImgPath}combo_ball_text_01.png` },
    { alias: "comboBallText02", src: `${gameImgPath}combo_ball_text_02.png` },
    { alias: "comboBallText03", src: `${gameImgPath}combo_ball_text_03.png` },
    { alias: "comboBallText04", src: `${gameImgPath}combo_ball_text_04.png` },
    { alias: "comboBallText05", src: `${gameImgPath}combo_ball_text_05.png` },
];

const audioAssets = [
    //audio
    { alias: "audioIntroBgm", src: `${audioPath}lobby_bgm.mp3` },
    { alias: "audioIntoBtn", src: `${audioPath}lobby_btn.mp3` },
    { alias: "gameBgm", src: `${audioPath}game_bgm.mp3` },
    { alias: "gameCombo", src: `${audioPath}game_combo.mp3` },
    { alias: "gameCorrect", src: `${audioPath}game_correct.mp3` },
    { alias: "gameIncorrect", src: `${audioPath}game_incorrect.mp3` },
];

const fonts = [
    {
        family: "NotoSans",
        weight: 400,
        url: `${fontPath}notosanskr-medium.woff2`, // 폰트 파일 경로
    },
    {
        family: "NotoSans",
        weight: 700,
        url: `${fontPath}notosanskr-bold.woff2`, // 폰트 파일 경로
    },
];

export default { assets, audioAssets, fonts };
