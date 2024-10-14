import { useParams, useSearchParams } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { wsContext } from "~/root";
import { API, Basic_Docs_Template, GetDomain } from "~/utility/api_static";
import { generate_document } from "~/utility/docs_exporter.client";
import { StreamingUITool } from "~/websocket/streaming_ui_tool";
import { SimulationResultType } from "./talk_simulation_type";

const StreamingContent = function({fixed_cache, export_docs_title}: {fixed_cache: string, export_docs_title: string}) {
    const [docs_url, set_docs_url] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const socket = useContext(wsContext);
    const params = useParams();
    const session_id = params['id'];
    const [complete, setComplete] = useState(false);

    const on_socket_callback = function(event_name: string, socket_data: string, p_complete: boolean) {
        setComplete(p_complete);
        if (session_id == event_name)
            setContent(socket_data);
    }

    useEffect(() => {
        setContent(fixed_cache);

        // Socket
        if (socket != null) {
            let streaming_tools = new StreamingUITool(socket);
            streaming_tools.callback = on_socket_callback;
        }

        set_docs_url(window.location.origin + Basic_Docs_Template);
    }, [fixed_cache]);

    const on_export_btn = function() {
        generate_document(docs_url, export_docs_title + ' - ', content);
    }

    return (
    <div className="content">
        <button className="button" disabled={!complete} onClick={on_export_btn}>匯出檔案</button>
        <pre>{content}</pre>
    </div>
)
}

export let Questionnaire_Report_View = function({simulation_result}: {simulation_result: SimulationResultType}) {
    const params = useParams();
    const session_id = params['id'];
    const socket = useContext(wsContext);
    const [content, set_content] = useState(simulation_result.report)

    useEffect(() => {
        console.log(socket);
        console.log(simulation_result);
        console.log(simulation_result.report_flag && socket != null);

        if ( ((simulation_result.report == '' || simulation_result.report == null) ||
        (simulation_result.report_flag)) && socket != null ){
            set_content('');

        console.log('FIRE');

        fetch(GetDomain(API.GenerateSimulationReport), {method: 'POST', headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
            session_id: session_id,
            socket_id: socket?.id
        })});
    }

    }, [])

    return (<div>
        <StreamingContent fixed_cache={content} export_docs_title="詳解"></StreamingContent>
    </div>)
}