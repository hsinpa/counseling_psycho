import { MetaFunction, useLocation, useNavigation, useSearchParams} from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Header_View from "~/pages/layout/header";
import { MediationStrategyView } from "~/pages/questionnaires/mediation_strategy";
import { wsContext } from "~/root";
import { StreamingUITool } from "~/websocket/streaming_ui_tool";

export const meta: MetaFunction = () => {
    return [
        { title: "Questionaire: Mediation Strategy" },
        { name: "description", content: "Mediation Strategy" },
    ];
};

export default function Mediation_Strategy_Page() {    
    const [report, setReport] = useState('');
    const socket = useContext(wsContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        //Cache
        let session_id = searchParams.get('session_id');

        // Socket
        if (socket != null) {
            let streaming_tools = new StreamingUITool(socket);
            streaming_tools.callback = (callback_session_id: string, socket_data: string, p_complete: boolean) => {
                setComplete(p_complete);
                if (callback_session_id == session_id)
                    setReport(socket_data);

                setReport(socket_data);
            };

            if (session_id != null) {
                streaming_tools.trigger_cache_data([session_id]);
            }
        }        
    }, [])

    return (
    <div>
        <Header_View></Header_View>
        <MediationStrategyView report={report} complete={complete}></MediationStrategyView>
    </div>);
}