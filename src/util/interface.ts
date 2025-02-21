export const initGame = (device_os: string) => {
    if (device_os === "iOS") {
        (window as any).webkit?.messageHandlers?.onInterfaceGameLoadComplete.postMessage("");
    } else {
        (window as any).littlefoxJavaInterface?.onInterfaceGameLoadComplete();
    }
};
