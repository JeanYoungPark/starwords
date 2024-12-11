const iconImgPath = "images/icons/";
const commonImgPath = "images/";
const introImgPath = "images/intro/";
const audioPath = "audio/";

const assets = [
    //common
    { alias: "bg", src: `${commonImgPath}background.png` },
    { alias: "soundOn", src: `${iconImgPath}sound_on.png` },
    { alias: "soundOff", src: `${iconImgPath}sound_off.png` },
    { alias: "soundText", src: `${iconImgPath}sound_text.png` },
    { alias: "close", src: `${iconImgPath}close.png` },

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

    //audio
    { alias: "audioBgm", src: `${audioPath}lobby_bgm.mp3` },
];

export default assets;
