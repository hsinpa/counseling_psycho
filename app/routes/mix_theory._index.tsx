import { MetaFunction, redirect, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import Header_View from "~/pages/layout/header";
import { API, GetDomain } from "~/utility/api_static";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { useContext, useEffect, useState } from "react";
import { QuestionFormType, TheoriesType } from "~/pages/questionnaires/questionnaire_type";
import { MixTheoryInputView } from "~/pages/multi_theory/mix_theory_inputs";
import { wsContext } from "~/root";
import { Email_Hint_Comp } from "~/pages/layout/email_hint_comp";

export const meta: MetaFunction = () => {
  return [
    { title: "Mix theory" },
    { name: "description", content: "Object relation theory" },
  ];
};

export async function loader() {
  const response = await fetch(GetDomain(API.GetMultiTheory));
  let theories: TheoriesType = await response.json();

  theories.theory.push({id: 'auto_select', name:'系統匹配', dimension: []});

  return theories;
}

export const action = async ({request}: ActionFunctionArgs) => {
  let json = await request.json();

  let fetch_data: any = {user_id: json.user_id, session_id: json.session_id, 
                        theory_id: json.selected_theory.map((x:any)=>x.id), content: json.user_info}

  let fetch_result = await fetch(GetDomain(API.UploadMixTheory), 
                          { method:'POST', 
                            headers: {"Content-Type": "application/json"}, 
                            body: JSON.stringify(fetch_data)
                          });

  let fetch_json = await fetch_result.json();

  let arrStr = encodeURIComponent(JSON.stringify(fetch_json.tokens));

  return redirect(`/mix_theory/analysis_report?session_id=${json.session_id}&tokens=${arrStr}`);
}

export default function Mix_Theory_Input_Page() {
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
            <MixTheoryInputView theory={theories}></MixTheoryInputView>
            <Email_Hint_Comp></Email_Hint_Comp>

        </div>
    );
  }
  