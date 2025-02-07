const commonImgPath = "images/";
const iconImgPath = "images/icons/";
const introImgPath = "images/intro/";
const guideImgPath = "images/guide/";
const rankingImgPath = "images/ranking/";
const gameImgPath = "images/game/";
const aliensImgPath = "images/game/aliens/";
const resultPath = "images/result/";
const comboDestroyAniImgPath = "images/game/combo_destroy_ani/";
const correctDestroyAniImgPath = "images/game/correct_destroy_ani/";
const incorrectAniImgPath = "images/game/incorrect_ani/";
const scoreBarImgPath = "images/game/score_bar/";
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
    { alias: "gameComboBg", src: `${gameImgPath}combo_bg.png` },

    { alias: "alien01", src: `${aliensImgPath}alien_01.png` },
    { alias: "alien02", src: `${aliensImgPath}alien_02.png` },
    { alias: "alien03", src: `${aliensImgPath}alien_03.png` },
    { alias: "alien04", src: `${aliensImgPath}alien_04.png` },
    { alias: "alien05", src: `${aliensImgPath}alien_05.png` },
    { alias: "combo01", src: `${aliensImgPath}combo_cnt_01.png` },
    { alias: "combo02", src: `${aliensImgPath}combo_cnt_02.png` },
    { alias: "combo03", src: `${aliensImgPath}combo_cnt_03.png` },
    { alias: "combo04", src: `${aliensImgPath}combo_cnt_04.png` },
    { alias: "combo05", src: `${aliensImgPath}combo_max.png` },
    { alias: "gameBar", src: `${scoreBarImgPath}bar.png` },

    { alias: "gameBarBg", src: `${scoreBarImgPath}bar_bg.png` },
    { alias: "gameScoreBg", src: `${scoreBarImgPath}score_board.png` },
    { alias: "gameComboScoreBg", src: `${scoreBarImgPath}combo_score_board.png` },

    { alias: "comboBall", src: `${scoreBarImgPath}combo_ball.png` },
    { alias: "maxComboBall", src: `${scoreBarImgPath}max_combo_ball.png` },

    { alias: "comboBallOn01", src: `${scoreBarImgPath}combo_ball_on_01.png` },
    { alias: "comboBallOn02", src: `${scoreBarImgPath}combo_ball_on_02.png` },
    { alias: "comboBallOn03", src: `${scoreBarImgPath}combo_ball_on_03.png` },
    { alias: "comboBallOn04", src: `${scoreBarImgPath}combo_ball_on_04.png` },

    { alias: "maxComboBallOn01", src: `${scoreBarImgPath}max_combo_ball_on_01.png` },
    { alias: "maxComboBallOn02", src: `${scoreBarImgPath}max_combo_ball_on_02.png` },
    { alias: "maxComboBallOnBg", src: `${scoreBarImgPath}max_combo_ball_bg_on.png` },
    { alias: "maxComboBallOnText", src: `${scoreBarImgPath}max_combo_ball_click_on.png` },

    { alias: "comboBallOnText01", src: `${scoreBarImgPath}combo_ball_on_text_01.png` },
    { alias: "comboBallOnText02", src: `${scoreBarImgPath}combo_ball_on_text_02.png` },
    { alias: "comboBallOnText03", src: `${scoreBarImgPath}combo_ball_on_text_03.png` },
    { alias: "comboBallOnText04", src: `${scoreBarImgPath}combo_ball_on_text_04.png` },

    { alias: "gauge", src: `${scoreBarImgPath}gauge.png` },
    { alias: "gauge2", src: `${scoreBarImgPath}gauge2.png` },

    { alias: "destroy01", src: `${correctDestroyAniImgPath}destroy_01.png` },
    { alias: "destroy02", src: `${correctDestroyAniImgPath}destroy_02.png` },
    { alias: "destroy03", src: `${correctDestroyAniImgPath}destroy_03.png` },
    { alias: "destroy04", src: `${correctDestroyAniImgPath}destroy_04.png` },
    { alias: "destroy05", src: `${correctDestroyAniImgPath}destroy_05.png` },
    { alias: "destroy06", src: `${correctDestroyAniImgPath}destroy_06.png` },
    { alias: "destroy07", src: `${correctDestroyAniImgPath}destroy_07.png` },
    { alias: "destroy08", src: `${correctDestroyAniImgPath}destroy_08.png` },
    { alias: "destroy09", src: `${correctDestroyAniImgPath}destroy_09.png` },
    { alias: "destroy10", src: `${correctDestroyAniImgPath}destroy_10.png` },
    { alias: "destroy11", src: `${correctDestroyAniImgPath}destroy_11.png` },
    { alias: "destroy12", src: `${correctDestroyAniImgPath}destroy_12.png` },
    { alias: "destroy13", src: `${correctDestroyAniImgPath}destroy_13.png` },

    { alias: "comboDestroy01", src: `${comboDestroyAniImgPath}combo_destroy_01.png` },
    { alias: "comboDestroy02", src: `${comboDestroyAniImgPath}combo_destroy_02.png` },
    { alias: "comboDestroy03", src: `${comboDestroyAniImgPath}combo_destroy_03.png` },
    { alias: "comboDestroy04", src: `${comboDestroyAniImgPath}combo_destroy_04.png` },
    { alias: "comboDestroy05", src: `${comboDestroyAniImgPath}combo_destroy_05.png` },
    { alias: "comboDestroy06", src: `${comboDestroyAniImgPath}combo_destroy_06.png` },
    { alias: "comboDestroy07", src: `${comboDestroyAniImgPath}combo_destroy_07.png` },
    { alias: "comboDestroy08", src: `${comboDestroyAniImgPath}combo_destroy_08.png` },
    { alias: "comboDestroy09", src: `${comboDestroyAniImgPath}combo_destroy_09.png` },
    { alias: "comboDestroy10", src: `${comboDestroyAniImgPath}combo_destroy_10.png` },

    { alias: "incorrect01", src: `${incorrectAniImgPath}incorrect_01.png` },
    { alias: "incorrect02", src: `${incorrectAniImgPath}incorrect_02.png` },
    { alias: "incorrect03", src: `${incorrectAniImgPath}incorrect_03.png` },
    { alias: "incorrect04", src: `${incorrectAniImgPath}incorrect_04.png` },
    { alias: "incorrect05", src: `${incorrectAniImgPath}incorrect_05.png` },
    { alias: "incorrect06", src: `${incorrectAniImgPath}incorrect_06.png` },
    { alias: "incorrect07", src: `${incorrectAniImgPath}incorrect_07.png` },
    { alias: "incorrect08", src: `${incorrectAniImgPath}incorrect_08.png` },

    // result
    { alias: "resultBg", src: `${resultPath}bg.png` },
    { alias: "tryAgain", src: `${resultPath}tryAgain.png` },
    { alias: "good", src: `${resultPath}good.png` },
    { alias: "excellent", src: `${resultPath}excellent.png` },
    { alias: "didIt", src: `${resultPath}didIt.png` },
    { alias: "dontGiveUp", src: `${resultPath}dontGiveUp.png` },
    { alias: "incorrectBtn", src: `${resultPath}incorrect_btn.png` },
    { alias: "resultRankingBtn01", src: `${resultPath}ranking_btn_01.png` },
    { alias: "resultRankingBtn02", src: `${resultPath}ranking_btn_02.png` },
    { alias: "resultTryAgainBtn01", src: `${resultPath}tryAgain_btn_01.png` },
    { alias: "resultTryAgainBtn02", src: `${resultPath}tryAgain_btn_02.png` },
];

const audioAssets = [
    //audio
    { alias: "audioIntroBgm", src: `${audioPath}lobby_bgm.mp3` },
    { alias: "audioIntoBtn", src: `${audioPath}lobby_btn.mp3` },
    { alias: "gameBgm", src: `${audioPath}game_bgm.mp3` },
    { alias: "gameCombo", src: `${audioPath}game_combo.mp3` },
    { alias: "gameCorrect", src: `${audioPath}game_correct.mp3` },
    { alias: "gameIncorrect", src: `${audioPath}game_incorrect.mp3` },
    { alias: "alienDestroy", src: `${audioPath}alien_destroy.mp3` },
    { alias: "result", src: `${audioPath}result.mp3` },
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
