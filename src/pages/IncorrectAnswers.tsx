import { Container, Sprite, Text } from "@pixi/react";
import { useContext, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ResourceContext } from "../context/ResourceContext";
import { incorrectListState } from "../store/gameStore";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../constants/commonConstants";
import { IncorrectType } from "../types/resourcesType";
import _ from "lodash";
import { INCORRECT_EN_TEXT_STYLE, INCORRECT_KO_TEXT_STYLE } from "../constants/resultContants";
import { PixiButton } from "../components/common/PixiButton";
import { actionState } from "../store/assetsStore";
import { Actions } from "../types/actionsType";
import { sound } from "@pixi/sound";

export const IncorrectAnswers = () => {
    const { resources } = useContext(ResourceContext);
    const incorrectList = useRecoilValue(incorrectListState);
    const setAction = useSetRecoilState(actionState);
    const [incorrectArr, setIncorrectArr] = useState<IncorrectType[][]>([]);
    const [page, setPage] = useState<number>(0);

    const handleOnClose = () => {
        setAction(Actions.GAME_FINISH);
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
                        />
                    )}
                    {page < incorrectArr.length - 1 && (
                        <Sprite
                            texture={resources.incorrectRightBtn}
                            anchor={0.5}
                            position={[CONTENT_WIDTH - 250, CONTENT_HEIGHT / 2]}
                            interactive={true}
                            onclick={() => setPage((prev) => prev + 1)}
                        />
                    )}
                </>
            )}
            <Sprite texture={resources.incorrectBg} anchor={0.5} position={[CONTENT_WIDTH / 2, 570]} scale={0.8}>
                {incorrectArr[page]?.map((data, i) => {
                    const key = Object.keys(data)[0];

                    return (
                        <Container key={key} position={[-700, -310 + 125 * i]}>
                            <Sprite texture={resources.incorrectSound} position={[0, -10]} />
                            <Text text={data[key].word_en} position={[300, 0]} style={INCORRECT_EN_TEXT_STYLE} anchor={0.5} />
                            <Text text={data[key].word_ko} position={[500, 0]} anchor={[0, 0.5]} style={INCORRECT_KO_TEXT_STYLE}/>
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
                />
            </Sprite>
        </Container>
    );
};
