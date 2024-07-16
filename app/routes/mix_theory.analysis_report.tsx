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
    let location = useLocation();
    const [report, setReport] = useState<MixTheoryResp>({content:'', theory_name:[], theory_id:[], id: ''});

    useEffect(() => {
        if (location.state != null ) {
            setReport(location.state);
        }
    }, [location.state])

    return (
    <div>
        <Header_View></Header_View>
        <MixTheoryReportView mix_thoery={report}></MixTheoryReportView>
    </div>);
}