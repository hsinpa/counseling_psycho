import type { MetaFunction } from "@remix-run/node";
import Home_View from "~/pages/Home/home_view";
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
    </div>
  );
}
