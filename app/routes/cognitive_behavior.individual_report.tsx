import { MetaFunction, useLocation, useNavigation, useSearchParams} from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Header_View from "~/pages/layout/header";
import { MediationStrategyView } from "~/pages/questionnaires/mediation_strategy";
import { wsContext } from "~/root";
import { socket_callback_tool } from "~/websocket/streaming_ui_tool";

export const meta: MetaFunction = () => {
    return [
        { title: "Questionaire: Mediation Strategy" },
        { name: "description", content: "Mediation Strategy" },
    ];
};

export default function Mediation_Strategy_Page() {
    const socket = useContext(wsContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [report, setReport] = useState('');

    useEffect(() => {
        socket_callback_tool(searchParams, socket, (session, data_str) => {
            setReport(data_str);
        } )
    }, [])

    return (
    <div>
        <Header_View></Header_View>
        <MediationStrategyView report={report}></MediationStrategyView>
    </div>);
}