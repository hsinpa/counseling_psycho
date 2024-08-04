import { SocketEvent } from "~/utility/api_static";
import { WebsocketManager } from "./websocket";
import { StreamingType } from "./websocket_type";

export class StreamingUITool {
    private _websocket: WebsocketManager;
    public callback: ((session_id: string, content: string) => void) | undefined = undefined;
    private _streaming_dict: Map<string, string>;

    constructor(websocket: WebsocketManager) {
        this._websocket = websocket;
        this._streaming_dict = new Map();
        this._websocket.ListenToEvent(SocketEvent.bot, this.on_socket_callback.bind(this));
    }

    trigger_cache_data(session_id_list: string[]) {
        // Check cache
        for (let session_id of session_id_list) {
            let cache_data = localStorage.getItem(session_id);

            if (cache_data != null) {
                this.callback?.(session_id, cache_data);
                return;
            }
        }
    }

    on_socket_callback(event_name: string, socket_data: any) {
        if (event_name != 'bot') return;

        let streaming_data: StreamingType = socket_data;
        let final_text = '';

        if (socket_data.type == 'chunk') {
            let cache_content = this._streaming_dict.get(streaming_data.session_id);
            if (cache_content == undefined) cache_content = ''
            
            final_text = cache_content + streaming_data.data;

        } else {
            // Complete
            final_text = streaming_data.data;

            localStorage.setItem(streaming_data.session_id, final_text);
            console.log('session_id_list', streaming_data.session_id);
        }

        this._streaming_dict.set(streaming_data.session_id, final_text);

        if (this.callback != undefined)
            this.callback(streaming_data.session_id, final_text);
    }
}

export const socket_callback_tool_with_session = function(session_id: string, socket: WebsocketManager | undefined, 
    callback: (session_id: string, socket_data: string) => void ) {

    // Socket
    if (socket != null) {
        let streaming_tools = new StreamingUITool(socket);
        streaming_tools.callback = callback;

        if (session_id != null) {
            streaming_tools.trigger_cache_data([session_id]);
        }
    }
}

export const socket_callback_tool = function(searchParams: URLSearchParams, socket: WebsocketManager | undefined, 
                                            callback: (session_id: string, socket_data: string) => void ) {
    //Cache
    let session_id = searchParams.get('session_id');

    if (session_id != null) 
        socket_callback_tool_with_session(session_id, socket, callback);
}