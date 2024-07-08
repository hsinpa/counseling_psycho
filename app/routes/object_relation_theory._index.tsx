import { MetaFunction, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { TheoryContainerView } from "~/pages/questionnaires/object_relation_theory_comp";
import Header_View from "~/pages/layout/header";
import { API, GetDomain } from "~/utility/api_static";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { useContext, useEffect, useState } from "react";
import { QuestionFormType } from "~/pages/questionnaires/questionnaire_type";
import { wsContext } from "~/root";

export const meta: MetaFunction = () => {
    return [
      { title: "Questionaire: Object relation theory" },
      { name: "description", content: "Object relation theory" },
    ];
  };

  export async function loader() {
    const response = await fetch(GetDomain(API.GetObjectRelationsTheory));
        
    return await response.json();
  }
  
  export const action = async ({request}: ActionFunctionArgs) => {
    let json = await request.json();
    console.log(json)

    let fetch_result = await fetch(GetDomain(API.UploadUserQuestionnaire), 
                                {method:'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(json)});

    return (await fetch_result.json());
  }

  export default function Object_Relation_Theory_Page() {
    const socket = useContext(wsContext)
    const theories_server = useLoaderData<typeof loader>();
    const [theories, set_theories] = useState<QuestionFormType[]>([]);

    useEffect(() => {
      if (theories_server != null) 
        set_theories(theories_server['questions']);
    }, [theories_server])

    return (
        <div className="object_relation_theory">
            <Header_View></Header_View>
            <TheoryContainerView theory={theories}></TheoryContainerView>
        </div>
    );
  }
  