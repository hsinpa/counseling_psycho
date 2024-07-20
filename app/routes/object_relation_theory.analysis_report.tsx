import { ActionFunctionArgs } from "@remix-run/node";
import { json, MetaFunction, useLocation, useNavigation} from "@remix-run/react";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Header_View from "~/pages/layout/header";
import { TheoryReportView } from "~/pages/questionnaires/theory_report_comp";
import { API, GetDomain } from "~/utility/api_static";

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

    return (await fetch_result.json());
  }

export default function Analysis_Report_Page() {
    let location = useLocation();
    const [report, setReport] = useState('');

    const next_url = '/object_relation_theory/mediation_strategy'

    useEffect(() => {
        let report_str = localStorage.getItem('user_report');

        if (report_str != null) {
            let report_json = JSON.parse(report_str);
            setReport(report_json.content);
        }
    }, []);

    return (
    <div>
        <Header_View></Header_View>
        <TheoryReportView report={report} individual_analysis_input={report} next_page_url={next_url}></TheoryReportView>
    </div>);
}