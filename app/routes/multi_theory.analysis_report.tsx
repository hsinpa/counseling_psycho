import { MetaFunction, useLocation, useNavigation} from "@remix-run/react";
import Header_View from "~/pages/layout/header";

export const meta: MetaFunction = () => {
    return [
        { title: "Multi theory report" },
        { name: "description", content: "Object relation theory" },
    ];
};

export default function Analysis_Report_Page() {

    return (
    <div>
        <Header_View></Header_View>
    </div>);
}