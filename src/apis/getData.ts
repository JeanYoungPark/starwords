import axios from "axios";

export const getGameData = async () => {
    /**
     * game type word master 일때
     * land code ko일 때
     * fu id가 있을 때
     * const res = await axios.get(`https://www.littlefox.com/starwords_h5_v3_api/game_info/${langCode}/${wordMasterSeq}/${stage}/${fu_id}`);
     * fu id가 없을 때
     * const res = await axios.get(`https://www.littlefox.com/starwords_h5_v3_api/game_info/${langCode}/${wordMasterSeq}/${stage}`);
     * land code ko 아닐 때
     * fu id가 있을 때
     * const res = await axios.get(`https://www.littlefox.com/${langCode}/starwords_h5_v3_api/game_info/${langCode}/${wordMasterSeq}/${stage}/${fu_id}`);
     * fu id가 없을 때
     * const res = await axios.get(`https://www.littlefox.com/${langCode}/starwords_h5_v3_api/game_info/${langCode}/${wordMasterSeq}/${stage}`);
     */
    /**
     * game type class 또는 normal 일 때
     * const res = await axios.get(`https://www.littlefox.com/starwords_api/game_info/${fuId}/${fcId}`);
     */
    const res = await axios.get("https://www.littlefox.com/starwords_api/game_info/ko/1/1");
    return res;
};

export const getUserData = async () => {
    /**
     * game type class 또는 normal 일 때
     * const res = await axios.get(`https://www.littlefox.com/starwords_api/user_info/${fuId}/${fcId}`);
     */
    const res = await axios.get("https://www.littlefox.com/starwords_api/user_info/U202205021507796459/C0011212");
    return res;
};

export const getContentsData = async () => {
    /**
     * game type word master 일때
     * land code ko일 때
     * const res = await axios.get(`https://www.littlefox.com/starwords_h5_v3_api/contents_info/${wordMasterSeq}/${stage}`);
     * land code ko 아닐 때
     * const res = await axios.get(`https://www.littlefox.com/${langCode}/starwords_h5_v3_api/contents_info/${wordMasterSeq}/${stage}`);
     */
    /**
     * game type class 또는 normal 일 때
     * const res = await axios.get(`https://www.littlefox.com/starwords_api/contents_info/${fuId}/${fcId}`);
     */
    const res = await axios.get("https://www.littlefox.com/starwords_api/contents_info/U202205021507796459/C0011212");
    return res;
};
