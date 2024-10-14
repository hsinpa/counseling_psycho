import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { useaTalkSimulationQuestionStore } from "~/client_model/talk_simulation_question_model";
import Header_View from "~/pages/layout/header";
import { Questionnaire_Container_View } from "~/pages/talk_simulation/talk_simulation_questionnaire";
import { SimTalkActionType, SimulationResultType } from "~/pages/talk_simulation/talk_simulation_type";
import { API, GetDomain } from "~/utility/api_static";
import { format_string } from "~/utility/utility_method";


export const action = async ({request}: ActionFunctionArgs) => {
    let json = await request.json();
    let session_id = json['session_id'];
    let event_id = json['event_id'];

    switch (event_id) {
        case SimTalkActionType.questionnaire: {
        }
        break;

        case SimTalkActionType.report: {
            let fetch_result = await fetch(GetDomain(API.UpdateSimulationQuiz), 
            {method:'PUT', headers: {"Content-Type": "application/json", "accept": "application/json"}, body: JSON.stringify(json)});

            return redirect('/talk_simulation/report/' + session_id);
        }
        break;
    }
      
    return ''
  }

export async function loader({params}: LoaderFunctionArgs) {
        let session_id = params.id;
        const response = await fetch(GetDomain( format_string(API.GetSimulationTalk, [session_id])));
            
        return await response.json();
    }

export default function Questionnaire_View() {
    const params = useParams();
    const set_questionnaires = useaTalkSimulationQuestionStore(x=>x.set_questionnaires);
    let id = params['id'];
    const simulation_result: SimulationResultType = useLoaderData<typeof loader>();

    if (id == undefined) id = '';

    useEffect(() => {
        console.log(simulation_result);
        set_questionnaires(simulation_result.questionnaires);
    }, [simulation_result]);

    return (
        <div>
            <Header_View></Header_View>
            <Questionnaire_Container_View session_id={id}></Questionnaire_Container_View>
        </div>
    )
}