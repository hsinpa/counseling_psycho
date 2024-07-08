import { MetaFunction, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { TheoryContainerView } from "~/pages/questionnaires/object_relation_theory_comp";
import Header_View from "~/pages/layout/header";
import { API, GetDomain } from "~/utility/api_static";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { QuestionFormType } from "~/pages/questionnaires/questionnaire_type";
import { CognitiveBehaviorView } from "~/pages/cognitive_behavior/cognitive_behavior";
import { MultiTheoryInputView } from "~/pages/multi_theory/multi_theory_inputs";

export const meta: MetaFunction = () => {
  return [
    { title: "Multi theory" },
    { name: "description", content: "Object relation theory" },
  ];
};


  export default function Multi_Theory_Input_Page() {

    useEffect(() => {
    }, [])

    return (
        <div>
            <Header_View></Header_View>
            <MultiTheoryInputView></MultiTheoryInputView>
        </div>
    );
  }
  