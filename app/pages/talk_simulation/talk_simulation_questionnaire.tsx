import { SimTalkActionType, SimulationQuestionnaireType, SimulationResultType } from "./talk_simulation_type";
import './talk_simulation.scss'
import { useaTalkSimulationQuestionStore } from "~/client_model/talk_simulation_question_model";
import { clamp, format_string, remix_uni_fetch } from "~/utility/utility_method";
import { API, GetDomain } from "~/utility/api_static";
import { useFetcher } from "@remix-run/react";


let RenderTextComponent = function({question, index}: {question: SimulationQuestionnaireType, index: number}) {
    const set_questionnaire = useaTalkSimulationQuestionStore(x=>x.answer_questionnaire);

    return (<div className="sim_questionnaire_text">
        <p>{question.content}</p>
        <textarea className="textarea" value={question.answer} onChange={x=>{
            set_questionnaire(index,  x.target.value);
        }}></textarea>
    </div>)
}

let RenderLabelComponent = function({question, index}: {question: SimulationQuestionnaireType, index: number}) {
    return (<div className="sim_questionnaire_label">
        <p>{question.content}</p>
        </div>)
}

let RenderNumberComponent = function({question, index}: {question: SimulationQuestionnaireType, index: number}) {
    const set_questionnaire = useaTalkSimulationQuestionStore(x=>x.answer_questionnaire);
    let qeustion_answer = question.answer;
    if (qeustion_answer == '' || qeustion_answer == undefined) qeustion_answer = '0';

    return (<div className="sim_questionnaire_number">
        <p>{question.content}</p>
        <input className="input" type='number' value={qeustion_answer} onChange={x=>{
            set_questionnaire(index, clamp(Number.parseInt(x.target.value), 0, 4).toString() );
        }}></input>
        </div>)
}

let RenderToolRow = function({session_id}: {session_id: string}) {
    const set_questionnaires = useaTalkSimulationQuestionStore(x=>x.set_questionnaires);

    const on_ai_answer_btn = async function(e: React.MouseEvent<HTMLButtonElement>) {
        const button_dom: HTMLButtonElement = e.target as HTMLButtonElement;
        button_dom.disabled = true;

        const response = await fetch(GetDomain(format_string(API.GetSimulationAnswer, [session_id])), {method:'post'});
        const json_result = (await response.json());

        set_questionnaires(json_result);
        button_dom.disabled = false;
    }

    return (<div className="tool_row">
        <button className="button docs_export">匯出檔案</button>
        <button className="button ai_helper_btn is-link is-light" onClick={on_ai_answer_btn}>AI回答</button>
    </div>);
}

let RenderSubmitRow = function({session_id}: {session_id: string}) {
    const questionnaires = useaTalkSimulationQuestionStore(x=>x.questionnaires);
    const fetcher = useFetcher({key: "sim_questionaire_action"});

    const on_ai_answer_btn = async function(e: React.MouseEvent<HTMLButtonElement>) {
        const button_dom: HTMLButtonElement = e.target as HTMLButtonElement;
        const action_attr = button_dom.getAttribute('data-action');
        let data: any = {
            questionnaires: questionnaires,
            session_id: session_id,
            event_id: action_attr
        }

        remix_uni_fetch(e.currentTarget, fetcher, data);
    }

    return (<div className="submit_row">
        <button className="button is-fullwidth" data-action={SimTalkActionType.questionnaire} onClick={on_ai_answer_btn}>深入解析</button>
        <button className="button is-fullwidth is-primary is-light" data-action={SimTalkActionType.report} onClick={on_ai_answer_btn}>取得治療策略</button>
    </div>);
}

export let Questionnaire_Container_View = function({session_id}: {session_id: string}) {
    const questionnaires = useaTalkSimulationQuestionStore(x=>x.questionnaires);

    let component_doms: JSX.Element[] = [];
    for (let i = 0; i < questionnaires.length; i++) {
        let questionnaire = questionnaires[i];

        switch(questionnaire.type){
            case 'text': 
                component_doms.push(<RenderTextComponent question={questionnaire} index={i} key={i}></RenderTextComponent>);
                break;
            case 'label': 
                component_doms.push(<RenderLabelComponent question={questionnaire} index={i} key={i}></RenderLabelComponent>);
                break;
            case 'number': 
                component_doms.push(<RenderNumberComponent question={questionnaire} index={i} key={i}></RenderNumberComponent>);
                break;
            
            default: component_doms.push(<RenderTextComponent question={questionnaire} index={i} key={i}></RenderTextComponent>);
        }
    }

    return (
        <main className="sim_questionnaire_container">
            <RenderToolRow session_id={session_id}></RenderToolRow>
            {component_doms}
            <RenderSubmitRow session_id={session_id}></RenderSubmitRow>
        </main>
    )
}