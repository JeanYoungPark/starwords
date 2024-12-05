import { Texture } from "pixi.js";
import { atom } from "recoil";

interface Resource {
    [key: string]: { texture: Texture }; // 리소스 키와 해당 텍스처
}

// 애셋 로드 상태
export const assetsLoadState = atom<boolean>({
    key: "assetsLoadState",
    default: false, // 로드 여부
});

// 로드된 리소스 상태
export const assetsResourcesState = atom<Resource | null>({
    key: "assetsResourcesState",
    default: null, // 로드된 리소스
});
