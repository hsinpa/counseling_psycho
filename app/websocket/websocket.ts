import { GetWSS, SocketEvent } from "~/utility/api_static";
import { format_string } from "~/utility/utility_method";
import { v4 as uuidv4 } from 'uuid';
import EventSystem from "~/utility/event_system";
import { json } from "@remix-run/react";

export class WebsocketManager extends EventSystem {
    private _socket: WebSocket | null = null;
    private _id: string = '';
    private _url: string;
    private session_set: Set<string> = new Set(); // To prevent multiple session socket, running at the same time

    get id() {
        return this._id;
    }

    constructor(url: string) {
        super();
        this._url = url;
    }

    connect() {
        this._id = uuidv4.toString();
        this._socket = new WebSocket(this._url);

        this._socket.addEventListener("open", (event) => {
            console.log('socket on connect');
        });
        
        this._socket.addEventListener("message", (event) => {
            // console.log("Message from server ", event.data);

            try {
                let event_json = JSON.parse(event.data);
                
                if (! ('event' in event_json)) return;

                if (event_json['event'] == SocketEvent.open)
                    this._id = event_json['_id'];

                this.Notify(event_json['event'], event_json);

            } catch(e) {
                console.error('Socket message parse', e)
            }
        });
    }

    register_session(session_id: string) {
        if (this.session_set.has(session_id)) {
            return false;
        }

        this.session_set.add(session_id);
        return true;
    }

    deregister_session(session_id: string) {
        this.session_set.delete(session_id);
    }
}

