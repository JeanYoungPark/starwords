import axios from "axios";
import { getCookie, getRequiredCookies } from "../util";

export const postGameData = async ({
    score,
    correctCnt,
    incorrectCnt,
    comboScore,
}: {
    score: number;
    correctCnt: number;
    incorrectCnt: number;
    comboScore: number;
}) => {
    let apiUrl: string;
    const serviceSite = getCookie("service_site");

    if (serviceSite === "foxschool") {
        const [schoolName, fcId, fuId, fgId, classCode, hwCode] = getRequiredCookies([
            "school_group_id",
            "Starwords_fc_id",
            "fx7",
            "fg_id",
            "class_code",
            "hw_code",
        ]);

        apiUrl = `${process.env.REACT_APP_FOXSCHOOL_API_ULR}/${schoolName}/starwords_h5_api/record/${fuId}/${fcId}/${fgId}/${score}/${correctCnt}/${comboScore}/${incorrectCnt}/${classCode}/${hwCode}`;
    } else {
        const gameType = getCookie("game_type");

        if (gameType === "word_master") {
            const [stage, wordMasterSeq, fuId] = getRequiredCookies(["stage", "word_master_seq", "fx7"]);

            apiUrl = `${process.env.REACT_APP_LITTLEFOX_API_ULR}/starwords_h5_v3_api/record/${stage}/${score}/${correctCnt}/${comboScore}/${incorrectCnt}/${wordMasterSeq}/${stage}/${fuId}`;
        } else if (gameType === "class") {
            const [fuId, fcId, classId] = getRequiredCookies(["fx7 ", "fc_id", "class_id"]);

            apiUrl = `${process.env.REACT_APP_LITTLEFOX_API_ULR}/starwords_api/record/${fuId}/${fcId}/${score}/${correctCnt}/${comboScore}/${incorrectCnt}/0/${classId}`;
        } else {
            const [fuId, fcId, hwNo] = getRequiredCookies(["fx7 ", "Starwords_fc_id", "hw_no"]);

            apiUrl = `${process.env.REACT_APP_LITTLEFOX_API_ULR}/starwords_api/record/${fuId}/${fcId}/${score}/${correctCnt}/${comboScore}/${incorrectCnt}/${hwNo}`;
        }
    }

    const res = await axios.post(apiUrl);

    if (res.status === 200) {
        return res.data;
    }
};
