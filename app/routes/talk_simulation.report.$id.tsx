import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData, useParams } from "@remix-run/react";
import { Email_Hint_Comp } from "~/pages/layout/email_hint_comp";
import Header_View from "~/pages/layout/header";
import { Questionnaire_Report_View } from "~/pages/talk_simulation/talk_simulation_report";
import { SimulationResultType } from "~/pages/talk_simulation/talk_simulation_type";
import { API, GetDomain } from "~/utility/api_static";
import { format_string } from "~/utility/utility_method";


export const action = async ({request}: ActionFunctionArgs) => {
    let json = await request.json();
    let session_id = json['session_id'];

    let fetch_result = await fetch(GetDomain(format_string(API.IterateSimulationQuiz, [session_id])), {method:'POST'});
    return redirect('/talk_simulation/questionnaire/' + session_id);
  }


export async function loader({params}: LoaderFunctionArgs) {
    let session_id = params.id;

    const response = await fetch(GetDomain(format_string(API.GetSimulationTalk, [session_id])));

    return await response.json();
}

export default function SimReport_View() {
    const simulation_result: SimulationResultType = useLoaderData<typeof loader>();
    return (
        <div>
            <Header_View></Header_View>
            <Questionnaire_Report_View simulation_result={simulation_result}></Questionnaire_Report_View>
            <Email_Hint_Comp></Email_Hint_Comp>
        </div>
    )
}