import { useParams } from "@remix-run/react";
import Header_View from "~/pages/layout/header";
import { Questionnaire_Report_View } from "~/pages/talk_simulation/talk_simulation_report";

export default function SimReport_View() {
    return (
        <div>
            <Header_View></Header_View>
            <Questionnaire_Report_View></Questionnaire_Report_View>
        </div>
    )
}