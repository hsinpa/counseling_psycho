import { MetaFunction} from "@remix-run/react";
import Single_Concept_View from "~/pages/Home/single_concept_view";
import Header_View from "~/pages/layout/header";

export const meta: MetaFunction = () => {
    return [
        { title: "單一理論個案概念化" },
        { name: "description", content: "Object relation theory" },
    ];
};

export default function Analysis_Report_Page() {
    return (
    <div className="home_page">
      <Header_View></Header_View>
      <Single_Concept_View></Single_Concept_View>
    </div>);
}