import type { MetaFunction } from "@remix-run/node";
import Home_View from "~/pages/Home/home_view";
import { Email_Hint_Comp } from "~/pages/layout/email_hint_comp";
import Header_View from "~/pages/layout/header";

export const meta: MetaFunction = () => {
  return [
    { title: "諮商師輔助系統" },
    { name: "description", content: "諮商師輔助系統" },
  ];
};

export default function Index() {
  return (
    <div className="home_page">
      <Header_View></Header_View>
      <Home_View></Home_View>

      <Email_Hint_Comp></Email_Hint_Comp>
    </div>
  );
}
