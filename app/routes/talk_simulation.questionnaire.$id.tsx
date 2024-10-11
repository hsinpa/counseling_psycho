import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { useaTalkSimulationQuestionStore } from "~/client_model/talk_simulation_question_model";
import Header_View from "~/pages/layout/header";
import { Questionnaire_Container_View } from "~/pages/talk_simulation/talk_simulation_questionnaire";
import { SimulationResultType } from "~/pages/talk_simulation/talk_simulation_type";
import { API, GetDomain } from "~/utility/api_static";
import { format_string } from "~/utility/utility_method";

export async function loader({params}: LoaderFunctionArgs) {
        let session_id = params.id;
        const response = await fetch(GetDomain( format_string(API.GetSimulationTalk, [session_id])));
            
        return await response.json();
    }

export default function Questionnaire_View() {
    const params = useParams();
    const set_questionnaires = useaTalkSimulationQuestionStore(x=>x.set_questionnaires);
    const id = params['id'];
    const simulation_result: SimulationResultType = useLoaderData<typeof loader>();

    useEffect(() => {
        console.log(simulation_result);
        set_questionnaires(simulation_result.questionnaires);
    }, [simulation_result]);

    return (
        <div>
            <Header_View></Header_View>
            <Questionnaire_Container_View></Questionnaire_Container_View>
        </div>
    )
}