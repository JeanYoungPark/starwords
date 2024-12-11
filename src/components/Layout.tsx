import { Container, Stage, PixiRef } from "@pixi/react";
import gsap from "gsap";
import { Application } from "pixi.js";
import React, { useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import { Intro } from "./Intro";
import { Loading } from "./Loading";
import { ResourceProvider } from "../context/ResourceProvider";
import { CommonLayout } from "./CommonLayout";

interface Props {
    title: string;
}

const CONTENT_WIDTH = 1920;
const CONTENT_HEIGHT = 1080;

export const Layout = ({ title }: Props) => {
    const container = useRef<PixiRef<typeof Container>>(null);

    const resizeWindow = () => {
        const winWidth = Math.min(window.innerWidth, CONTENT_WIDTH);
        const winHeight = Math.min(window.innerHeight, CONTENT_WIDTH);
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

            const winWidth = Math.min(window.innerWidth, CONTENT_WIDTH);

            app.renderer.view.width = winWidth;
            app.renderer.view.height = CONTENT_HEIGHT * window.scale;

            // 렌더러 크기 조정
            app.renderer.resize(winWidth, CONTENT_HEIGHT * window.scale);

            // 컨테이너 위치 및 크기 조정
            container.current.position.x = (winWidth - CONTENT_WIDTH * window.scale) / 2;
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
            <Stage onMount={onMountApp} width={CONTENT_WIDTH} height={CONTENT_HEIGHT}>
                <RecoilRoot>
                    <ResourceProvider>
                        <Container ref={container}>
                            <CommonLayout />
                        </Container>
                    </ResourceProvider>
                </RecoilRoot>
            </Stage>
        </HelmetProvider>
    );
};
