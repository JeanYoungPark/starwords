export const initGame = (device_os: String) => {
    if (device_os === "iOS") {
        (window as any).webkit?.messageHandlers?.onInterfaceGameLoadComplete.postMessage("");
    } else {
        (window as any).littlefoxJavaInterface?.onInterfaceGameLoadComplete();
    }
};

export const webviewClose = (device_os: String) => {
	if (device_os == 'Android') {
		(window as any).littlefoxJavaInterface.onInterfaceExitView();
	} else {
		(window as any).webkit.messageHandlers.onInterfaceExitView.postMessage("");
	}
}