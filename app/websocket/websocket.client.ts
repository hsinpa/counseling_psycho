import { WS } from "~/utility/api_static";

export class WebsocketManager {
    private _socket: WebSocket | null = null;

    connect() {
        this._socket = new WebSocket(WS);

        this._socket.addEventListener("open", (event) => {
            this._socket?.send("Hello Server!");
          });          
    }


}

