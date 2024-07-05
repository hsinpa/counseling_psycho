import { ActionFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLocation, useNavigation} from "@remix-run/react";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Header_View from "~/pages/layout/header";
import { TheoryReportView } from "~/pages/questionnaires/theory_report_comp";
import { API, GetDomain } from "~/utility/api_static";

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

    return (await fetch_result.json());
  }

export default function Cognitiive_Report_Page() {
    let location = useLocation();
    const [report, setReport] = useState('');
    const next_url = '/cognitive_behavior/individual_report'
    const [user_input, setUserInput] = useState('');


    useEffect(() => {
        if (location.state != null) {
            let storage_user_input = localStorage.getItem('user_input_raw');
            setReport(location.state.content);
            setUserInput(
                (storage_user_input == null) ? '' : storage_user_input
            );
        }
    }, [location.state])

    return (
    <div>
        <Header_View></Header_View>
        <TheoryReportView report={report} individual_analysis_input={user_input}  next_page_url={next_url}></TheoryReportView>
    </div>);
}