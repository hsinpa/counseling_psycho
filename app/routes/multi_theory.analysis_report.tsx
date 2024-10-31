import { json, MetaFunction, useLocation, useNavigation, useSearchParams} from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { useMultiTheoryStore } from "~/client_model/multi_theory_model";
import Header_View from "~/pages/layout/header";
import { TheoryResp } from "~/pages/questionnaires/questionnaire_type";
import { MultiTheoryReportView } from "~/pages/multi_theory/multi_theory_report";
import { wsContext } from "~/root";
import { socket_callback_tool, socket_callback_tool_with_session } from "~/websocket/streaming_ui_tool";
import { Email_Hint_Comp } from "~/pages/layout/email_hint_comp";

export const meta: MetaFunction = () => {
    return [
        { title: "Multi theory report" },
        { name: "description", content: "Object relation theory" },
    ];
};


let cache_reports: TheoryResp[] = [];
export default function Analysis_Report_Page() {
    const [report, setReport] = useState<TheoryResp[]>([]);
    const socket = useContext(wsContext)
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let session_id_list_raw = searchParams.get('session_id');
        if (session_id_list_raw != null) {
            let session_id_list: any[] = JSON.parse(session_id_list_raw);

            let theory_reports: TheoryResp[] = session_id_list.map(x => { return {
                content: '', 
                theory_id: x.theory.id, 
                theory_name: x.theory.name,
                id: x.session_id}
            } );

            cache_reports = theory_reports;
            setReport(cache_reports);

            for (let t of theory_reports) {
                socket_callback_tool_with_session(t.id, socket, (session, data_str) => {
                    let report_index = cache_reports.findIndex(x=>x.id == session);
                    if (report_index < 0) return;

                    cache_reports[report_index].content = data_str;
                    setReport([...cache_reports]);
                } )
            }
        }

        return () => {
            cache_reports = []
        }
    }, [])

    return (
    <div>
        <Header_View></Header_View>
        <MultiTheoryReportView theories={report}></MultiTheoryReportView>
        <Email_Hint_Comp></Email_Hint_Comp>

    </div>);
}