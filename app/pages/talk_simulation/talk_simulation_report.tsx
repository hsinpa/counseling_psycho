import { useFetcher, useParams, useSearchParams } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { wsContext } from "~/root";
import { API, Basic_Docs_Template, GetDomain } from "~/utility/api_static";
import { SimulationResultType } from "./talk_simulation_type";
import { StreamingContentView } from "../layout/streaming_content";
import './talk_simulation.scss'
import { remix_uni_fetch } from "~/utility/utility_method";

export let Questionnaire_Report_View = function({simulation_result}: {simulation_result: SimulationResultType}) {
    const params = useParams();
    let session_id = params['id'];
    const socket = useContext(wsContext);
    const [content, set_content] = useState(simulation_result.report)
    const fetcher = useFetcher({ key: "talk_simulation_report" });

    if (session_id == undefined) session_id = '';

    useEffect(() => {
        if ( ((simulation_result.report == '' || simulation_result.report == null) ||
        (simulation_result.report_flag)) && socket?.register_session(session_id) ){
            set_content('');

            fetch(GetDomain(API.GenerateSimulationReport), {method: 'POST', headers:{"Content-Type": "application/json"},
                body: JSON.stringify({
                session_id: session_id,
                socket_id: socket?.id
            })});
        }

        return (() => {
            socket?.deregister_session(session_id)
        });
    }, [])

    return (<div className="sim_report_container">
        <StreamingContentView session_id={session_id} default_content={content} export_docs_title="詳解"></StreamingContentView>
    
        <button className="button is-fullwidth re-gen-questionnaire-btn is-link is-outlined" onClick={(e) => {                
                remix_uni_fetch(e.currentTarget, fetcher, {session_id: session_id});
        }}>深入解析</button>
    </div>)
}