import { ActionFunctionArgs } from "@remix-run/node";
import { json, MetaFunction, redirect, useLocation, useNavigation, useSearchParams} from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Header_View from "~/pages/layout/header";
import { TheoryReportView } from "~/pages/questionnaires/theory_report_comp";
import { wsContext } from "~/root";
import { API, GetDomain } from "~/utility/api_static";
import { StreamingUITool } from "~/websocket/streaming_ui_tool";

export const meta: MetaFunction = () => {
    return [
        { title: "Questionaire: Object relation theory" },
        { name: "description", content: "Object relation theory" },
    ];
};

export const action = async ({request}: ActionFunctionArgs) => {
    let json = await request.json();
    let fetch_result = await fetch(GetDomain(API.UploadTheoryReport), 
                                {method:'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(json)});


    return redirect('/object_relation_theory/mediation_strategy?session_id='+json.session_id);
  }

export default function Analysis_Report_Page() {
    let location = useLocation();
    const [report, setReport] = useState('');
    const socket = useContext(wsContext)

    const next_url = '/object_relation_theory/mediation_strategy'
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        //Cache
        let session_id = searchParams.get('session_id');

        console.log('session_id', session_id);
        console.log('socket id', socket?.id);

        // Socket
        if (socket != null) {
            let streaming_tools = new StreamingUITool(socket);
            streaming_tools.callback = (event_name: string, socket_data: string) => {
                setReport(socket_data);
            };

            if (session_id != null) {
                streaming_tools.trigger_cache_data([session_id]);
            }
        }        
    }, []);

    return (
    <div>
        <Header_View></Header_View>
        <TheoryReportView report={report} individual_analysis_input={report} next_page_url={next_url}></TheoryReportView>
    </div>);
}