import WS from "jest-websocket-mock";
import { connectToWebSocket } from './webSocketConnection';

const testUrl = "ws://localhost:1234";

const mockOpen = jest.fn(),
        mockClose = jest.fn(),
        mockError = jest.fn();

describe('Test suites forwebSocketConnection util', () => {
    it('Establish WS connection and send events', async () => {
        let message = {data: ''};
        const server = new WS(testUrl);
        connectToWebSocket(
            testUrl,
            mockOpen,
            mockClose,
            (messageWs) => {message = messageWs;},
            mockError
        );

        await server.connected;
        expect(mockOpen).toHaveBeenCalled();
        server.send("hello everyone");
        expect(message.data).toEqual('hello everyone');
        server.error();
        expect(mockError).toHaveBeenCalled();
        server.close();
        expect(mockClose).toHaveBeenCalled();
    })
});