import { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
    contentWidth: number;
    contentHeight: number;
    disabled?: boolean;
}

export const ScreenLayout = ({ children, contentWidth, contentHeight, disabled }: Props) => {
    const [contentScale, setContentScale] = useState<number>(0);
    const [contentLeft, setContentLeft] = useState<number>(0);
    const [contentTop, setContentTop] = useState<number>(0);

    const resizeWindow = () => {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const scaleX = winWidth / contentWidth;
        const scaleY = winHeight / contentHeight;
        const scale = Math.min(scaleX, scaleY);
        setContentScale(scale);
        setContentLeft((winWidth - contentWidth * scale) / 2);
        setContentTop((winHeight - contentHeight * scale) / 2);
        window.scale = scale;
    };

    useEffect(() => {
        window.addEventListener("resize", resizeWindow);
        window.dispatchEvent(new Event("resize"));
        window.addEventListener("orientationchange", () => setTimeout(resizeWindow, 100));
    }, []);

    return (
        <div
            id=' '
            style={{
                height: `${contentHeight * contentScale + contentTop}px`,
                pointerEvents: `${disabled ? "none" : "all"}`,
            }}>
            <div
                id='content-wrap'
                style={{
                    left: `${contentLeft}px`,
                    top: `${contentTop}px`,
                    width: `${contentWidth}px`,
                    height: `${contentHeight}px`,
                    transform: `scale(${contentScale}, ${contentScale})`,
                }}>
                {children}
            </div>
        </div>
    );
};
