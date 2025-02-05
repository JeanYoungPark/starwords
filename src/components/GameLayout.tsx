import { Container, Stage, PixiRef } from "@pixi/react";
import { Application } from "pixi.js";
import { ReactNode, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ScreenLayout } from "./ScreenLayout";
import { isMobile } from "../util";
import gsap from "gsap";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../constants/commonConstants";

interface Props {
    children: ReactNode;
    title: string;
    resultPopupData: any;
}

export const GameLayout = ({ children, title, resultPopupData }: Props) => {
    const container = useRef<PixiRef<typeof Container>>(null);

    const resizeApp = (app: Application) => {
        if (container.current && app?.renderer) {
            app.renderer.view.width = window.innerWidth;
            app.renderer.view.height = CONTENT_HEIGHT * window.scale;
            gsap.set(app.renderer.view, { top: (window.innerHeight - CONTENT_HEIGHT * window.scale) / 2 });

            // 렌더러 크기 조정
            app.renderer.resize(window.innerWidth, CONTENT_HEIGHT * window.scale);

            // 컨테이너 위치 및 크기 조정
            container.current.position.x = (window.innerWidth - CONTENT_WIDTH * window.scale) / 2;
            container.current.scale.set(window.scale);
        }
    };

    const onMountApp = (app: Application) => {
        const handleResize = () => resizeApp(app);

        // 초기 리사이즈
        requestAnimationFrame(() => {
            resizeApp(app);
        });

        // 리사이즈 이벤트 리스너 등록
        window.addEventListener("resize", () => setTimeout(handleResize, 0));
        window.addEventListener("orientationchange", () => setTimeout(() => handleResize, 100));

        return () => {
            // 리사이즈 이벤트 리스너 제거
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Stage
                onMount={onMountApp}
                width={CONTENT_WIDTH}
                height={CONTENT_HEIGHT}
                options={{
                    backgroundColor: 0x000000,
                    useContextAlpha: false,
                    antialias: false,
                    autoDensity: true,
                    resolution: !isMobile() ? 2 : window.devicePixelRatio,
                }}>
                <Container ref={container}>{children}</Container>
            </Stage>
            <ScreenLayout contentWidth={CONTENT_WIDTH} contentHeight={CONTENT_HEIGHT} disabled={!resultPopupData ? true : false}>
                <div id='content'>
                    {/* {resultPopupData && <ResultPopup data={resultPopupData} type={type} step={step ? step : 1} onClose={onCloseResultPopup} />} */}
                </div>
            </ScreenLayout>
        </HelmetProvider>
    );
};
