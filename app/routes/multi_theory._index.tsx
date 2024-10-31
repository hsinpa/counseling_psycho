import { MetaFunction, redirect, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { TheoryContainerView } from "~/pages/questionnaires/object_relation_theory_comp";
import Header_View from "~/pages/layout/header";
import { API, GetDomain } from "~/utility/api_static";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { QuestionFormType, TheoriesType } from "~/pages/questionnaires/questionnaire_type";
import { CognitiveBehaviorView } from "~/pages/cognitive_behavior/cognitive_behavior";
import { MultiTheoryInputView } from "~/pages/multi_theory/multi_theory_inputs";
import { v4 as uuidv4 } from 'uuid';
import { Email_Hint_Comp } from "~/pages/layout/email_hint_comp";

export const meta: MetaFunction = () => {
  return [
    { title: "Multi theory" },
    { name: "description", content: "Object relation theory" },
  ];
};

export async function loader() {
  const response = await fetch(GetDomain(API.GetMultiTheory));
      
  return await response.json();
}

export const action = async ({request}: ActionFunctionArgs) => {
  let json = await request.json();

  let fetch_session: any[] = [];
  let fetch_promise: Promise<any>[] = [];
  for (let i = 0; i < json.selected_theory.length; i++) {
    let fetch_data: any = {user_id: json.user_id, session_id: uuidv4(), theory_id: json.selected_theory[i].id, content: json.user_info}
    let fetch_result = fetch(GetDomain(API.UploadMultiTheory), {method:'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(fetch_data)});

    fetch_session.push({theory: json.selected_theory[i], session_id: fetch_data.session_id});
    fetch_promise.push(fetch_result);
  }
  
  await Promise.all(fetch_promise);

  let arrStr = encodeURIComponent(JSON.stringify(fetch_session));
  return redirect('/multi_theory/analysis_report?session_id='+arrStr);
}

  export default function Multi_Theory_Input_Page() {
    const multi_theory_data = useLoaderData<typeof loader>();
    const [theories, set_theories] = useState<TheoriesType>({theory:[]});

    useEffect(() => {
      if (multi_theory_data != null) 
        set_theories(multi_theory_data);
      console.log(multi_theory_data)
    }, [multi_theory_data])

    return (
        <div>
            <Header_View></Header_View>
            <MultiTheoryInputView theory={theories}></MultiTheoryInputView>
            <Email_Hint_Comp></Email_Hint_Comp>

        </div>
    );
  }
  