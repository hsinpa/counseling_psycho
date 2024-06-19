import { MetaFunction} from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Questionaire: Object relation theory" },
        { name: "description", content: "Object relation theory" },
    ];
};

export default function Analysis_Report_Page() {
    return (
    <div>
        Analysis Report
    </div>);
}