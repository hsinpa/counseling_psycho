import { MetaFunction, useNavigation} from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Questionaire: Object relation theory" },
        { name: "description", content: "Object relation theory" },
    ];
};

export default function Analysis_Report_Page() {
    let navigation = useNavigation();

    console.log('navigation.state', navigation.state);

    return (
    <div>
        Analysis Report
    </div>);
}