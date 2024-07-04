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

    let on_submit = function() {
        let all_inputs = document.querySelectorAll('textarea, input[type="range"]');
        console.log(all_inputs);
        
        let post_content: any[] = []

        all_inputs.forEach((x: any) =>{
            let item = questions.find(x=>x.id == x.id);

            if (item == null || x.value == '') return;
            
            post_content.push({
                questionnaire_id: item.id,
                questionnaire: item.content,
                content: x.value,    
            });
        });

        console.log(post_content)
    }
    

    return (<div className="container cognitive_behavior_container">
        <RenderShortTheoryForm title={'理論二 認知行為療法'}></RenderShortTheoryForm>
        <RenderLongCognitiveForm questions={questions}></RenderLongCognitiveForm>

        <button className='button is-fullwidth is-info is-light' onClick={on_submit}>獲得個案分析報告</button>
    </div>);
}

export let RenderLongCognitiveForm = function({questions}: {questions: QuestionFormType[]}) {
    if (questions == null) questions = [];

    let text_fields = questions.filter(x => x.type == 'text_field').map(x=>RenderSingleQuestionSlot(x));
    let numbers = questions.filter(x => x.type == 'number').map(x=>RenderSingleSliderSlot(x));

    return (
        <div className='cognitive_long_questions'>
            {text_fields}
            <br></br>
            <p>最後想邀請您做一個小小的問卷，請您仔細回想在最近一星期中(包括今天), 這些問題使您感到困擾或苦惱的程度, 分別給予0-4分的分數, 0分是完全沒有, 4分是非常厲害</p>
            {numbers}
        </div>
    );
}