import { useState } from 'react';
import { RenderShortTheoryForm } from '../questionnaires/object_relation_theory_comp';
import '../questionnaires/questionarie.scss'
import { QuestionFormType } from '../questionnaires/questionnaire_type';


let RenderSingleQuestionSlot = function(question: QuestionFormType) {
    return (<div key={question.id} className='question_textarea_slot'>
        <label>{question.content}</label>
        <textarea id={question.id} className='textarea' ></textarea>
    </div>)
}

let RenderSingleSliderSlot = function(question: QuestionFormType) {
    const [score, setScore] = useState<number>(0);

    let on_value_change = function(e: React.ChangeEvent<HTMLInputElement>) {
       setScore(Number.parseInt(e.target.value));
    }

    return (<div key={question.id} className='question_slider_slot'>
        <label>{question.content}</label>
        <input type='range' id={question.id} min={0} max={4} defaultValue={0} onChange={on_value_change}></input>
        <span>{score}分</span>
    </div>)
}


export let CognitiveBehaviorView = function({questions}: {questions: QuestionFormType[]}) {

    return (<div className="container cognitive_behavior_container">
        <RenderShortTheoryForm title={'理論二 認知行為療法'}></RenderShortTheoryForm>
        <RenderLongCognitiveForm questions={questions}></RenderLongCognitiveForm>

        <button className='button is-fullwidth is-info is-light'>獲得個案分析報告</button>
    </div>);
}

export let RenderLongCognitiveForm = function({questions}: {questions: QuestionFormType[]}) {

    let all_questions: JSX.Element[] = [];
    if (questions == null) questions = [];

    for (let i = 0; i < questions.length; i++) {
        if (questions[i].type == 'text_field')
            all_questions.push(RenderSingleQuestionSlot(questions[i]));

        if (questions[i].type == 'number')
            all_questions.push(RenderSingleSliderSlot(questions[i]))
    }
    

    return (
        <div className='cognitive_long_questions'>
            {all_questions}
        </div>
    );
}