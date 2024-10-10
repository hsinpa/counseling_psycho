import { useParams } from "@remix-run/react";

export default function Questionnaire_View() {
    const params = useParams();
    const id = params['id'];

    return (
        <div>
            How are you
        </div>
    )
}