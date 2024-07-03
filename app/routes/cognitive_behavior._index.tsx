import { MetaFunction, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { TheoryContainerView } from "~/pages/questionnaires/object_relation_theory_comp";
import Header_View from "~/pages/layout/header";
import { API, GetDomain } from "~/utility/api_static";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { ObjectRelationTheoryType } from "~/pages/questionnaires/questionnaire_type";
import { CognitiveBehaviorView } from "~/pages/cognitive_behavior/cognitive_behavior";

export const meta: MetaFunction = () => {
    return [
      { title: "Questionaire: Object relation theory" },
      { name: "description", content: "Object relation theory" },
    ];
  };

  export default function Object_Relation_Theory_Page() {

    useEffect(() => {
    }, [])

    return (
        <div className="cognitive_behavior">
            <Header_View></Header_View>
            <CognitiveBehaviorView></CognitiveBehaviorView>
        </div>
    );
  }
  