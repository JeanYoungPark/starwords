import { Container, Sprite, Text } from "@pixi/react";
import React, { useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ResourceContext } from "../../context/ResourceContext";
import { incorrectListState } from "../../store/gameStore";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../../constants/commonConstants";
import { IncorrectType } from "../../types/resourcesType";
import _ from "lodash";
import { INCORRECT_EN_TEXT_STYLE } from "../../constants/resultContants";

export const IncorrectAnswers = () => {
    const { resources } = useContext(ResourceContext);
    const incorrectList = useRecoilValue(incorrectListState);
    const [incorrectArr, setIncorrectArr] = useState<IncorrectType[][]>([]);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        console.log(incorrectArr[page]);
    }, [incorrectArr]);

    useEffect(() => {
        setIncorrectArr(_.chunk(incorrectList, 7));
    }, []);

    return (
        <Container>
            <Sprite texture={resources.bg} anchor={0.5} position={[CONTENT_WIDTH / 2, 640]} />
            <Sprite texture={resources.incorrectLeftBtn} anchor={0.5} position={[100, CONTENT_HEIGHT / 2]} />
            <Sprite texture={resources.incorrectBg} anchor={0.5} position={[CONTENT_WIDTH / 2, 570]} scale={0.8}>
                {incorrectArr[page]?.map((data, i) => {
                    const key = Object.keys(data)[0];

                    return (
                        <Container key={key} position={[-700, -310 + 125 * i]}>
                            <Sprite texture={resources.incorrectSound} position={[0, -10]} />
                            <Text text={data[key].word_en} position={[300, 0]} style={INCORRECT_EN_TEXT_STYLE} anchor={0.5} />
                            <Text text={data[key].word_ko} position={[500, 0]} anchor={[0, 0.5]} />
                            <Text text={`${data[key].cnt}`} position={[resources.incorrectBg.width - 160, 0]} anchor={0.5} />
                        </Container>
                    );
                })}
            </Sprite>
            <Sprite texture={resources.incorrectRightBtn} anchor={0.5} />
        </Container>
    );
};
