import { ActionFunctionArgs } from "@remix-run/node";
import { MetaFunction, redirect, useLocation, useNavigation, useSearchParams} from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Header_View from "~/pages/layout/header";
import { TheoryReportView } from "~/pages/questionnaires/theory_report_comp";
import { wsContext } from "~/root";
import { API, GetDomain } from "~/utility/api_static";
import { socket_callback_tool } from "~/websocket/streaming_ui_tool";

const next_url = '/cognitive_behavior/individual_report'

export const meta: MetaFunction = () => {
    return [
        { title: "Questionaire: Cognitive behavior" },
        { name: "description", content: "Cognitive behavior theory" },
    ];
};

export const action = async ({request}: ActionFunctionArgs) => {
    let json = await request.json();
    let fetch_result = await fetch(GetDomain(API.OutputCognitiveIndividual), 
                                {method:'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(json)});

    return redirect(next_url + '?session_id='+json.session_id);
  }

export default function Cognitiive_Report_Page() {
    const [report, setReport] = useState('');
    const [complete, setComplete] = useState(false);

    const [user_input, setUserInput] = useState('');
    const socket = useContext(wsContext)
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        let storage_user_input = localStorage.getItem('user_input_raw');
        setUserInput((storage_user_input == null) ? '' : storage_user_input  );

        socket_callback_tool(searchParams, socket, (session, data_str, p_complete: boolean) => {
            setComplete(p_complete);
            setReport(data_str);
        } )

    }, []);

    return (
    <div>
        <Header_View></Header_View>
        <TheoryReportView report={report} complete={complete} individual_analysis_input={user_input}  next_page_url={next_url}></TheoryReportView>
    </div>);
}