import { json, MetaFunction, useLocation, useNavigation} from "@remix-run/react";
import { useContext, useEffect } from "react";
import { useMultiTheoryStore } from "~/client_model/multi_theory_model";
import Header_View from "~/pages/layout/header";
import { wsContext } from "~/root";
import {v4 as uuid4} from 'uuid'

export const meta: MetaFunction = () => {
    return [
        { title: "Multi theory report" },
        { name: "description", content: "Object relation theory" },
    ];
};

export default function Analysis_Report_Page() {
    let user_info = useMultiTheoryStore(x=>x.user_info);
    let selected_theory = useMultiTheoryStore(x=>x.selected_theory);
    const socket = useContext(wsContext)

    useEffect(() => {
        // console.log(user_info);
        // console.log(selected_theory);
        let session_id = uuid4()
        socket?.ListenToEvent(session_id, (x: any) => {
            console.log(x)
        });

        // fetch('http://localhost:8842/multi_theory/output_multi_theory_report', 
        //     {method:'POST',
        //      headers: {"Content-Type": "application/json"},
        //      body: JSON.stringify({user_id: 'hi', session_id: session_id, theory_id: selected_theory[0].id, content: user_info})})

    }, [user_info, selected_theory, socket])

    return (
    <div>
        <Header_View></Header_View>
    </div>);
}