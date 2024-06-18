import { MetaFunction } from "@remix-run/react";
import { TheoryContainerView } from "~/pages/questionnaires/object_relation_theory_comp";
import Header_View from "~/pages/layout/header";

export const meta: MetaFunction = () => {
    return [
      { title: "Questionaire: Object relation theory" },
      { name: "description", content: "Object relation theory" },
    ];
  };
  
  export default function Object_Relation_Theory_Page() {
    return (
        <div className="object_relation_theory">
            <Header_View></Header_View>
            <TheoryContainerView></TheoryContainerView>
        </div>
    );
  }
  