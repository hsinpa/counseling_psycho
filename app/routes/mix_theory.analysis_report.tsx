import { json, MetaFunction, useLocation, useNavigation} from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import Header_View from "~/pages/layout/header";
import { MixTheoryResp, TheoryResp } from "~/pages/questionnaires/questionnaire_type";
import { MixTheoryReportView } from "~/pages/multi_theory/mix_theory_report";

export const meta: MetaFunction = () => {
    return [
        { title: "Mix theory report" },
        { name: "description", content: "Object relation theory" },
    ];
};

export default function Analysis_Report_Page() {
    const [report, setReport] = useState<MixTheoryResp>({content:'', theory_name:[], theory_id:[], id: ''});

    useEffect(() => {
        let report_str = localStorage.getItem('user_report');

        if (report_str != null) {
            let report_json = JSON.parse(report_str);
            setReport(report_json);
        }
    }, [])

    return (
    <div>
        <Header_View></Header_View>
        <MixTheoryReportView mix_thoery={report}></MixTheoryReportView>
    </div>);
}