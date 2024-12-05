import { Container, Stage, PixiRef } from "@pixi/react";
import gsap from "gsap";
import { Application } from "pixi.js";
import React, { useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface Props {
    children: React.ReactNode;
    title: string;
}

const CONTENT_WIDTH = 2048;
const CONTENT_HEIGHT = 1280;

export const Layout = ({ children, title }: Props) => {
    const container = useRef<PixiRef<typeof Container>>(null);

    const resizeWindow = () => {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const scaleX = winWidth / CONTENT_WIDTH;
        const scaleY = winHeight / CONTENT_HEIGHT;
        const scale = Math.min(scaleX, scaleY);
        // setContentScale(scale);
        // setContentLeft((winWidth-(contentWidth*scale))/2);
        // setContentTop((winHeight-(contentHeight*scale))/2);
        window.scale = scale;
    };

    const resizeApp = (app: Application) => {
        if (container.current && app?.renderer) {
            resizeWindow();

            // app.renderer.view.width = window.innerWidth;

            // 렌더러 크기 조정
            app.renderer.resize(window.innerWidth, CONTENT_HEIGHT * window.scale);

            // 컨테이너 위치 및 크기 조정
            container.current.position.x = (window.innerWidth - CONTENT_WIDTH * window.scale) / 2;
            container.current.scale.set(window.scale);

            // 캔버스 스타일 설정 (CSS 속성)
            gsap.set(app.renderer.view, {
                top: (window.innerHeight - CONTENT_HEIGHT * window.scale) / 2,
            });
        }
    };

    const onMountApp = (app: Application) => {
        const handleResize = () => resizeApp(app);

        // 초기 리사이즈
        resizeApp(app);

        // 리사이즈 이벤트 리스너 등록
        window.addEventListener("resize", () => setTimeout(handleResize, 0));
        window.addEventListener("orientationchange", () => setTimeout(() => handleResize, 100));
        //   document.addEventListener('visibilitychange', onVisibleChange);

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
            <Stage onMount={onMountApp} width={CONTENT_WIDTH} height={CONTENT_HEIGHT}>
                <Container ref={container}>{children}</Container>
            </Stage>
        </HelmetProvider>
    );
};
