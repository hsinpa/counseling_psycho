import { MetaFunction, useLocation, useNavigation} from "@remix-run/react";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Header_View from "~/pages/layout/header";
import { MediationStrategyView } from "~/pages/questionnaires/mediation_strategy";

export const meta: MetaFunction = () => {
    return [
        { title: "Questionaire: Mediation Strategy" },
        { name: "description", content: "Mediation Strategy" },
    ];
};

export default function Mediation_Strategy_Page() {
    let location = useLocation();
    
    const [report, setReport] = useState('');

    useEffect(() => {
        if (location.state != null ) {
            setReport(location.state.content);
        }
    }, [location.state])

    return (
    <div>
        <Header_View></Header_View>
        <MediationStrategyView report={report}></MediationStrategyView>
    </div>);
}