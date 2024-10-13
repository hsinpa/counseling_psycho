import { useParams, useSearchParams } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { wsContext } from "~/root";
import { Basic_Docs_Template } from "~/utility/api_static";
import { generate_document } from "~/utility/docs_exporter.client";
import { StreamingUITool } from "~/websocket/streaming_ui_tool";

const StreamingContent = function() {
    const [docs_url, set_docs_url] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const socket = useContext(wsContext);
    const params = useParams();
    const session_id = params['id'];
    const [complete, setComplete] = useState(false);

    const on_socket_callback = function(event_name: string, socket_data: string, p_complete: boolean) {
        setComplete(p_complete);
        console.log(session_id)
        if (session_id == event_name)
            setContent( socket_data);
    }

    useEffect(() => {
        // Socket
        if (socket != null) {
            let streaming_tools = new StreamingUITool(socket);
            streaming_tools.callback = on_socket_callback;
            if (session_id != null) {
                streaming_tools.trigger_cache_data([session_id]);
            }
        } 

        set_docs_url(window.location.origin + Basic_Docs_Template);
    }, []);

    const on_export_btn = function() {
        generate_document(docs_url, '個案分析報告 - ', content);
    }

    return (
    <div className="content">
        <button className="button" disabled={!complete} onClick={on_export_btn}>匯出檔案</button>
        <pre>{content}</pre>
    </div>
)
}

export let Questionnaire_Report_View = function() {
    return (<div>
        <StreamingContent></StreamingContent>
    </div>)
}