import { json, MetaFunction, useLocation, useNavigation, useSearchParams} from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import Header_View from "~/pages/layout/header";
import { MixTheoryResp, TheoryResp } from "~/pages/questionnaires/questionnaire_type";
import { MixTheoryReportView } from "~/pages/multi_theory/mix_theory_report";
import { socket_callback_tool_with_session } from "~/websocket/streaming_ui_tool";
import { wsContext } from "~/root";

export const meta: MetaFunction = () => {
    return [
        { title: "Mix theory report" },
        { name: "description", content: "Object relation theory" },
    ];
};

let cache_reports: TheoryResp[] = [];
export default function Analysis_Report_Page() {
    const [report, setReport] = useState<TheoryResp[]>([]);
    const socket = useContext(wsContext)
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let session_id_list_raw = searchParams.get('tokens');
        if (session_id_list_raw != null) {
            console.log(session_id_list_raw);
            let session_id_list: string[] = JSON.parse(session_id_list_raw);

            let theory_reports: TheoryResp[] = [
                {theory_name: '三種理論名稱',id: session_id_list[0], content: '', theory_id:'theories_name'},
                {theory_name: '個案資料',id: session_id_list[1], content: '', theory_id:'user_info'},
                {theory_name: '理論向度',id: session_id_list[2], content: '', theory_id:'dimension'}
            ]
            
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
        <MixTheoryReportView mix_thoery={report}></MixTheoryReportView>
    </div>);
}