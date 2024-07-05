import { WS } from "~/utility/api_static";
import { format_string } from "~/utility/utility_method";
import { v4 as uuidv4 } from 'uuid';

export class WebsocketManager {
    private _socket: WebSocket | null = null;
    private _id: string = '';

    get id() {
        return this._id;
    }

    connect() {
        this._id = uuidv4.toString();
        this._socket = new WebSocket(format_string(WS, [this._id]));

        this._socket.addEventListener("open", (event) => {
            this._socket?.send("Hello Server!");
          });          
    }


}

