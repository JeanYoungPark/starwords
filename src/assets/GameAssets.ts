const commonImgPath = "images/";
const iconImgPath = "images/icons/";
const introImgPath = "images/intro/";
const guideImgPath = "images/guide/";
const rankingImgPath = "images/ranking/";
const audioPath = "audio/";

const assets = [
    //common
    { alias: "bg", src: `${commonImgPath}background.png` },
    { alias: "soundOn", src: `${iconImgPath}sound_on.png` },
    { alias: "soundOff", src: `${iconImgPath}sound_off.png` },
    { alias: "soundText", src: `${iconImgPath}sound_text.png` },
    { alias: "close", src: `${iconImgPath}close.png` },
    { alias: "back", src: `${iconImgPath}back.png` },

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
];

const audioAssets = [
    //audio
    { alias: "audioIntroBgm", src: `${audioPath}lobby_bgm.mp3` },
    { alias: "audioIntoBtn", src: `${audioPath}lobby_btn.mp3` },
];

// export default assets;
export default { assets, audioAssets };
