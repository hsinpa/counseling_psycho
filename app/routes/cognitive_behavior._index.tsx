import { MetaFunction, redirect, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { TheoryContainerView } from "~/pages/questionnaires/object_relation_theory_comp";
import Header_View from "~/pages/layout/header";
import { API, GetDomain } from "~/utility/api_static";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { QuestionFormType } from "~/pages/questionnaires/questionnaire_type";
import { CognitiveBehaviorView } from "~/pages/cognitive_behavior/cognitive_behavior";
import { sleep } from "~/utility/utility_method";

export const meta: MetaFunction = () => {
  return [
    { title: "Questionaire: Object relation theory" },
    { name: "description", content: "Object relation theory" },
  ];
};

export async function loader() {
  const response = await fetch(GetDomain(API.GetCognitiveBehavior));
      
  return await response.json();
}

export const action = async ({request}: ActionFunctionArgs) => {
  let json = await request.json();

  let fetch_result = fetch(GetDomain(API.UploadCognitiveReport), 
                              {method:'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(json)});
                              
  await sleep(1000);

  return redirect('/cognitive_behavior/analysis_report?session_id='+json.session_id);
}

  export default function Object_Relation_Theory_Page() {
    const theories_server = useLoaderData<typeof loader>();
    const [theories, set_theories] = useState<QuestionFormType[]>([]);

    useEffect(() => {
      console.log(theories_server)
      if (theories_server != null) 
        set_theories(theories_server['questions']);
    }, [theories_server])

    return (
        <div>
            <Header_View></Header_View>
            <CognitiveBehaviorView questions={theories}></CognitiveBehaviorView>
        </div>
    );
  }
  