import { Container, Stage, PixiRef } from "@pixi/react";
import { Application } from "pixi.js";
import { ReactNode, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import gsap from "gsap";

import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../constants/commonConstants";
import { isMobile } from "../util";

interface Props {
    children: ReactNode;
    title: string;
}

export const GameLayout = ({ children, title }: Props) => {
    const container = useRef<PixiRef<typeof Container>>(null);

    const resizeApp = (app: Application) => {
        if (container.current && app?.renderer) {
            const scale = Math.min(window.innerWidth / CONTENT_WIDTH, window.innerHeight / CONTENT_HEIGHT);

            app.renderer.view.width = window.innerWidth;
            app.renderer.view.height = CONTENT_HEIGHT * scale;
            gsap.set(app.renderer.view, { top: (window.innerHeight - CONTENT_HEIGHT * Math.min(scale, 1)) / 2 });

            // 렌더러 크기 조정
            app.renderer.resize(window.innerWidth, CONTENT_HEIGHT * scale);

            // 컨테이너 위치 및 크기 조정
            // container.current.position.x = (window.innerWidth - CONTENT_WIDTH * scale) / 2;
            container.current.scale.set(scale);
        }
    };

    const onMountApp = (app: Application) => {
        let resizeTimeout: number;

        const handleResize = () => {
            window.clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => resizeApp(app), 100);
        };

        requestAnimationFrame(() => resizeApp(app));

        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);

        return () => {
            window.clearTimeout(resizeTimeout);
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
                width={window.innerWidth}
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
        </HelmetProvider>
    );
};
