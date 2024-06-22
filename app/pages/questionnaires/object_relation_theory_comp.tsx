import { useEffect, useState } from 'react'
import './questionarie.scss'
import { QuestionaireFormTemplate, Questionaries } from '~/utility/static_text'
import left_arrow_img from '~/assets/UI/left-arrow.png';
import right_arrow_img from '~/assets/UI/right-arrow.png';
import { clamp } from '~/utility/utility_method';
import { ObjectRelationTheoryType } from './questionnaire_type';
import { useFetcher, useNavigate } from '@remix-run/react';
import { API, GetDomain } from '~/utility/api_static';

export let TheoryContainerView = function({theory}: {theory: ObjectRelationTheoryType[]}) {
    return (<div className="container">
        {RenderShortTheoryForm()}
        {RenderLongTheoryForm(theory)}
    </div>)
}

let RenderShortTheoryForm = function() {
    return (
    <div className="short_theory_form">
        <h2 className='title'>理論一 客體關係理論</h2>

        <section>
            <div className="field">
                <label className="label">您的年齡</label>
                <input className="input" name="age" type='number' placeholder="年齡"></input>
            </div>

            <div className="field">
                <label className="label">性別</label>
                <div className="select">
                    <select name='gender'>
                        <option>男</option>
                        <option>女</option>
                        <option>其他</option>
                    </select>
                </div>
            </div>

            <div className="field">
                <label className="label">會談主題</label>
                <input className="input" name="theme" type='text' placeholder="輸入主題"></input>
            </div>

            <div className="field">
                <label className="label">會談期待</label>
                <input className="input" name="expectation" type='text' placeholder="輸入期待"></input>
            </div>
        </section>
    </div>)
}

export let RenderLongTheoryForm = function(theory: ObjectRelationTheoryType[]) {
    const navigate = useNavigate();
    const fetcher = useFetcher({ key: "add-to-bag" });

    let [progress, setProgress] = useState<number>(0);
    let [question_index, set_question_index] = useState<number>(0);
    let [answers, set_answers] = useState<string[]>(Array(Questionaries.length).fill(""));

    let question = "";
    let theory_type : ObjectRelationTheoryType | null = null;

    if (theory !=null && question_index < theory.length) {
        question = theory[question_index].question;
        theory_type = theory[question_index];
    }

    useEffect(() => {
        console.log(fetcher)
        if (fetcher.state == 'loading' && fetcher.data != null) {

            navigate("/object_relation_theory/analysis_report", {
                replace: false,
                relative: "route",
                state: fetcher.data,
            });
        }
    }, [fetcher])

    let on_arrow_click = function(direction: number) {
        let new_index = clamp(question_index + direction, 0, Questionaries.length - 1);
        set_question_index(new_index);
        setProgress((new_index / (Questionaries.length - 1)) * 100);
        console.log(new_index / (Questionaries.length - 1) * 100);
    }

    let on_textarea_change = function(e: React.FormEvent<HTMLTextAreaElement>) {
        const newValue = e.currentTarget.value;
        let clone_answer = [...answers];

        clone_answer[question_index] = newValue;
        set_answers(clone_answer);
    }

    let on_submit_button = async function() {
        let button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.long_theory_form button');
        let data = {...QuestionaireFormTemplate};
            data.question_answer_pairs = [];

        for (let i = 0; i < answers.length; i++) {
            theory[i].question_id
            data.question_answer_pairs.push({
                question_id: theory[i].question_id,
                question: theory[i].question,
                question_order: theory[i].order,
                answer: answers[i],
            });
        } 

        if (button == null) return;

        button.disabled = true;
        try {
            fetcher.formAction = location.href;
            fetcher.submit(
                data,
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
        } catch{
            button.disabled = false;
            return;
        }
    }

    return(
        <div className="long_theory_form">

            <h3 className='subtitle'>{question}</h3>

            <div className="field">
                <label className="label">您的回答</label>
                <textarea className="textarea" onChange={on_textarea_change} placeholder="輸入文字 . . ." value={answers[question_index]}></textarea>
            </div>

            <progress className="progress is-small" value={progress} max="100">{progress}%</progress>

            <div className='arrow_group'>
                <img onClick={ () => on_arrow_click(-1)} src={left_arrow_img}></img>
                <img onClick={ () => on_arrow_click(1)} src={right_arrow_img}></img>
            </div>

            <button className='button is-fullwidth is-info is-light' onClick={on_submit_button}>取得個案分析報告</button>
        </div>
    )
}