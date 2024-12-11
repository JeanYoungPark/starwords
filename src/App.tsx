import React from "react";
import { Starwords } from "./components/Starwords";

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

function App() {
    return <Starwords />;
}

export default App;
