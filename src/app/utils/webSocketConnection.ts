export const connectToWebSocket = (
    websocketUrl: string,
    onOpen?: () => void,
    onClose?: () => void,
    onMessage?: (message: WebsocketMessage) => void,
    onError?: () => void
) => {
    const webSocket = new WebSocket(websocketUrl);
    webSocket.onopen = () => {
        onOpen && onOpen();
    }
    webSocket.onclose = () => {
        onClose && onClose();
    }
    webSocket.onmessage = (newMessage: any) => {
        onMessage && onMessage(newMessage);
    }
    webSocket.onerror = () => {
        onError && onError();
    }
    return webSocket;
}

interface WebsocketMessage {
    type: string,
    data: string
}