import { Texture } from "pixi.js";

export interface Resource {
    [key: string]: Texture; // 리소스 키와 해당 텍스처
}
