import { json, MetaFunction, useLocation, useNavigation} from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { useMultiTheoryStore } from "~/client_model/multi_theory_model";
import Header_View from "~/pages/layout/header";
import { TheoryResp } from "~/pages/questionnaires/questionnaire_type";
import { MultiTheoryReportView } from "~/pages/multi_theory/multi_theory_report";

export const meta: MetaFunction = () => {
    return [
        { title: "Multi theory report" },
        { name: "description", content: "Object relation theory" },
    ];
};

export default function Analysis_Report_Page() {
    const [report, setReport] = useState<TheoryResp[]>([]);

    useEffect(() => {
        let report_str = localStorage.getItem('user_report');

        if (report_str != null) {
            let report_json = JSON.parse(report_str);
            console.log(report_json)
            setReport(report_json);
        }
    }, [])

    return (
    <div>
        <Header_View></Header_View>
        <MultiTheoryReportView theories={report}></MultiTheoryReportView>
    </div>);
}