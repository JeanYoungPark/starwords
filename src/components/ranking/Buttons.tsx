import { Sprite } from "@pixi/react";
import React, { useContext } from "react";
import { ResourceContext } from "../../context/ResourceContext";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../../constants/commonConstants";

export const Buttons = ({
    rankingArrLength,
    page,
    handlePageBtn,
}: {
    rankingArrLength: number;
    page: number;
    handlePageBtn: (val: number) => void;
}) => {
    const { resources } = useContext(ResourceContext);

    return (
        <>
            {rankingArrLength > 1 && (
                <>
                    {page > 0 && (
                        <Sprite
                            texture={resources.incorrectLeftBtn}
                            anchor={0.5}
                            position={[230, CONTENT_HEIGHT / 2 + 60]}
                            interactive={true}
                            onclick={() => handlePageBtn(-1)}
                        />
                    )}
                    {rankingArrLength - 1 && (
                        <Sprite
                            texture={resources.incorrectRightBtn}
                            anchor={0.5}
                            position={[CONTENT_WIDTH - 250, CONTENT_HEIGHT / 2 + 60]}
                            interactive={true}
                            onclick={() => handlePageBtn(1)}
                        />
                    )}
                </>
            )}
        </>
    );
};
