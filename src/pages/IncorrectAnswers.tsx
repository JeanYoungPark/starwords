import { Container, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ResourceContext } from "../context/ResourceContext";
import { incorrectListState, soundMuteState } from "../store/gameStore";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../constants/commonConstants";
import { IncorrectType } from "../types/resourcesType";
import _ from "lodash";
import { INCORRECT_EN_TEXT_STYLE, INCORRECT_KO_TEXT_STYLE } from "../constants/resultContants";
import { PixiButton } from "../components/common/PixiButton";
import { actionState, langCodeState } from "../store/assetsStore";
import { Actions } from "../types/actionsType";
import { sound } from "@pixi/sound";
import { AutosizeText } from "../components/common/AutosizeText";

export const IncorrectAnswers = () => {
    const { resources } = useContext(ResourceContext);
    const incorrectList = useRecoilValue(incorrectListState);
    const langCode = useRecoilValue(langCodeState);
    const setAction = useSetRecoilState(actionState);
    const soundState = useRecoilValue(soundMuteState);
    const [incorrectArr, setIncorrectArr] = useState<IncorrectType[][]>([]);
    const [page, setPage] = useState<number>(0);

    const handleOnClose = () => {
        setAction(Actions.GAME_FINISH);
    };

    const incorrectBgImg = () => {
        if(langCode === 'jp') return resources.incorrectJpBg;
        if(langCode === 'cn') return resources.incorrectCnBg;
        if(langCode === 'tw' || langCode === 'hk') return resources.incorrectTwBg;
        return resources.incorrectBg;
    }

    const playWordSound = (soundUrl: string) => {
        if (!soundUrl) return;
        
        const soundPath = `https://cdn.littlefox.co.kr/contents/vocab/${soundUrl.substring(0,1)}/${soundUrl}.mp3`;
        
        if(!soundState) {
            sound.unmuteAll();
            sound.stopAll()
        }

        // 사운드가 이미 로드되어 있는지 확인
        if (sound.exists(soundUrl)) {
            sound.play(soundUrl, {
                complete: () => {
                    if(!soundState) sound.muteAll();
                }
            });
        } else {
            // 사운드 로드 후 재생
            sound.add(soundUrl, {
                url: soundPath,
                preload: true,
                loaded: (err) => {
                    if (!err) {
                        sound.play(soundUrl, {
                            complete: () => {
                                if(!soundState) sound.muteAll();
                            }
                        });
                    } else {
                        console.error("Failed to load sound:", err);
                    }
                }
            });
        }
    };

    // TODO: bg 이미지 변경
    useEffect(() => {
        setIncorrectArr(_.chunk(incorrectList, 7));
    }, []);

    return (
        <Container>
            <Sprite texture={resources.bg} anchor={0.5} position={[CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2]} />
            {incorrectList.length > 7 && (
                <>
                    {page > 0 && (
                        <Sprite
                            texture={resources.incorrectLeftBtn}
                            anchor={0.5}
                            position={[250, CONTENT_HEIGHT / 2]}
                            interactive={true}
                            onclick={() => setPage((prev) => prev - 1)}
                            ontouchend={() => setPage((prev) => prev - 1)}
                            />
                    )}
                    {page < incorrectArr.length - 1 && (
                        <Sprite
                            texture={resources.incorrectRightBtn}
                            anchor={0.5}
                            position={[CONTENT_WIDTH - 250, CONTENT_HEIGHT / 2]}
                            interactive={true}
                            onclick={() => setPage((prev) => prev + 1)}
                            ontouchend={() => setPage((prev) => prev + 1)}
                        />
                    )}
                </>
            )}
            <Sprite texture={incorrectBgImg()} anchor={0.5} position={[CONTENT_WIDTH / 2, 570]} scale={0.8}>
                {incorrectArr[page]?.map((data, i) => {
                    const key = Object.keys(data)[0];
                    
                    return (
                        <Container key={key} position={[-700, -310 + 125 * i]}>
                            <Sprite texture={resources.incorrectSound} position={[0, -10]} interactive={true} onclick={() => playWordSound(data[key].sound_url)} ontouchend={() => playWordSound(data[key].sound_url)}/>
                            <Text text={data[key].word_en} position={[300, 0]} style={INCORRECT_EN_TEXT_STYLE} anchor={0.5} />
                            <AutosizeText
                                text={data[key].word_ko} maxWidth={700} position={[500, 0]} anchor={[0, 0.5]} style={INCORRECT_KO_TEXT_STYLE}
                            />
                            <Text text={`${data[key].cnt}`} position={[resources.incorrectBg.width - 160, 0]} anchor={0.5} />
                        </Container>
                    );
                })}
                <PixiButton
                    name='close'
                    scale={0.5}
                    position={[680, -490]}
                    defaultTexture={resources.close}
                    sound={sound.find("audioIntoBtn")}
                    interactive={true}
                    onclick={handleOnClose}
                    ontouchend={handleOnClose}
                />
            </Sprite>
        </Container>
    );
};
