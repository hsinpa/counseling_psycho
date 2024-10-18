import { useContext, useEffect, useState } from "react";
import { wsContext } from "~/root";
import { Basic_Docs_Template } from "~/utility/api_static";
import { generate_document } from "~/utility/docs_exporter.client";
import { StreamingUITool } from "~/websocket/streaming_ui_tool";
import './streaming_content.scss'

export const StreamingContentView = function({session_id, default_content, export_docs_title, cache_flag=false}: 
    {session_id: string, default_content: string, export_docs_title: string, cache_flag?: boolean}) {

        const [docs_url, set_docs_url] = useState<string>('');
        const [content, setContent] = useState<string>('');
        const socket = useContext(wsContext);
        const [complete, setComplete] = useState(false);
    
        const on_socket_callback = function(event_name: string, socket_data: string, p_complete: boolean) {
            setComplete(p_complete);
            if (session_id == event_name)
                setContent(socket_data);
        }
    
        useEffect(() => {
            setContent(default_content);
    
            // Socket
            if (socket != null) {
                let streaming_tools = new StreamingUITool(socket);
                streaming_tools.callback = on_socket_callback;

                if (cache_flag) {
                    streaming_tools.trigger_cache_data([session_id]);
                }
            }
    
            if (default_content != undefined || default_content != '') setComplete(true);
    
            set_docs_url(window.location.origin + Basic_Docs_Template);
            
        }, [default_content]);
    
        const on_export_btn = function() {
            generate_document(docs_url, export_docs_title + ' - ', content);
        }
    
        return (
        <div className="content streaming_content">
            <button className="button" disabled={!complete} onClick={on_export_btn}>匯出檔案</button>
            <pre>{content}</pre>
        </div>
    )
}