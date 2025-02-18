import axios from "axios";
import { getCookie, getRequiredCookies } from "../util";

export const getGameData = async () => {
    let apiUrl: string;

    const serviceSite = getCookie("service_site");

    if (serviceSite === "foxschool") {
        // const fgId = getCookie("fg_id");
        // const classCode = getCookie("class_code");
        // const hwCode = getCookie("hw_code");
        const [schoolName, fcId, fuId] = getRequiredCookies(["school_group_id", "Starwords_fc_id", "fx7"]);
        apiUrl = `${process.env.REACT_APP_FOXSCHOOL_API_ULR}/${schoolName}/starwords_h5_api/game_info/${fuId}/${fcId}`;
    } else {
        const gameType = getCookie("game_type");
        const fuId = getCookie("fx7");
        // const hwCode = getCookie("hw_no");

        if (gameType === "word_master") {
            const [wordMasterSeq, stage, langCode] = getRequiredCookies(["word_master_seq", "stage", "lang_code"]);

            const baseUrl =
                langCode === "kr" ? process.env.REACT_APP_LITTLEFOX_API_ULR : `${process.env.REACT_APP_LITTLEFOX_GLOBAL_API_ULR}/${langCode}`;

            apiUrl = `${baseUrl}/starwords_h5_v3_api/game_info/${wordMasterSeq}/${stage}${fuId ? `/${fuId}` : ""}`;
        } else {
            const fcIdKey = gameType === "class" ? "fc_id" : "Starwords_fc_id";
            const [fcId, fuId] = getRequiredCookies([fcIdKey, "fx7"]);

            apiUrl = `${process.env.REACT_APP_LITTLEFOX_API_ULR}/starwords_api/game_info/${fuId}/${fcId}`;
        }
    }

    const res = await axios.get(apiUrl);

    if (res.status === 200) {
        return res.data;
    }
};

export const getUserData = async () => {
    let apiUrl: string;

    const serviceSite = getCookie("service_site");

    if (serviceSite === "foxschool") {
        const [schoolName, fcId, fuId] = getRequiredCookies(["school_group_id", "Starwords_fc_id", "fx7"]);
        apiUrl = `${process.env.REACT_APP_FOXSCHOOL_API_ULR}/${schoolName}/starwords_h5_api/user_info/${fuId}/${fcId}`;
    } else {
        const gameType = getCookie("game_type");

        if (gameType === "class" || gameType === "normal") {
            const fcIdKey = gameType === "class" ? "fc_id" : "Starwords_fc_id";
            const [fcId, fuId] = getRequiredCookies([fcIdKey, "fx7"]);

            apiUrl = `${process.env.REACT_APP_LITTLEFOX_API_ULR}/starwords_api/user_info/${fuId}/${fcId}`;
        } else {
            throw new Error("Not supported game type");
        }
    }

    const res = await axios.get(apiUrl);

    if (res.status === 200) {
        return res.data;
    }
};

export const getContentsData = async () => {
    let apiUrl: string;

    const serviceSite = getCookie("service_site");

    if (serviceSite === "foxschool") {
        const [schoolName, fcId, fuId] = getRequiredCookies(["school_group_id", "Starwords_fc_id", "fx7"]);
        apiUrl = `${process.env.REACT_APP_FOXSCHOOL_API_ULR}/${schoolName}/starwords_h5_api/contents_info/${fuId}/${fcId}`;
    } else {
        const gameType = getCookie("game_type");
        // const hwCode = getCookie("hw_no");

        if (gameType === "word_master") {
            const [wordMasterSeq, stage, langCode] = getRequiredCookies(["word_master_seq", "stage", "lang_code"]);

            const baseUrl =
                langCode === "kr" ? process.env.REACT_APP_LITTLEFOX_API_ULR : `${process.env.REACT_APP_LITTLEFOX_GLOBAL_API_ULR}/${langCode}`;

            apiUrl = `${baseUrl}/starwords_h5_v3_api/contents_info/${wordMasterSeq}/${stage}`;
        } else {
            const fcIdKey = gameType === "class" ? "fc_id" : "Starwords_fc_id";
            const [fcId, fuId] = getRequiredCookies([fcIdKey, "fx7"]);

            apiUrl = `${process.env.REACT_APP_LITTLEFOX_API_ULR}/starwords_api/contents_info/${fuId}/${fcId}`;
        }
    }

    const res = await axios.get(apiUrl);

    if (res.status === 200) {
        return res.data;
    }
};

export const getRankingData = async () => {
    let apiUrl: string;
    const serviceSite = getCookie("service_site");

    if (serviceSite === "foxschool") {
        const [schoolName, fcId, fuId, fgId] = getRequiredCookies(["school_group_id", "Starwords_fc_id", "fx7", "fg_id"]);
        apiUrl = `${process.env.REACT_APP_FOXSCHOOL_API_ULR}/${schoolName}/starwords_h5_api/ranking/${fuId}/${fcId}/${fgId}`;
    } else {
        const gameType = getCookie("game_type");
        const fcIdKey = gameType === "class" ? "fc_id" : "Starwords_fc_id";
        const [fcId, fuId] = getRequiredCookies([fcIdKey, "fx7"]);

        if (gameType === "class") {
            const [classId] = getRequiredCookies(["class_id"]);
            apiUrl = `${process.env.REACT_APP_LITTLEFOX_API_ULR}/starwords_api/ranking/${fuId}/${fcId}/${classId}`;
        } else {
            apiUrl = `${process.env.REACT_APP_LITTLEFOX_API_ULR}/starwords_api/ranking/${fuId}/${fcId}`;
        }
    }

    const res = await axios.get(apiUrl);

    if (res.status === 200) {
        return res.data;
    }
};
