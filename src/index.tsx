import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/common.min.css";
import reportWebVitals from "./reportWebVitals";

declare global {
    //전역 설정
    interface Window {
        // 윈도우 가변 스케일 값
        scale: number;
        // 서비스 타입
        serviceType: string;
        // lecture ID (파닉스)
        lecId: string;
        // 커리큘럼 ID (파닉스)
        curId: string;
        // 코스 ID (파닉스)
        courseId: number;
        // 사용자 ID
        fuId: string;
        // device name
        deviceName: string;
    }
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
