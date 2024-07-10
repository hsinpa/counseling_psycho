import { useMultiTheoryStore } from '~/client_model/multi_theory_model';
import './multi_theory.scss'
import { TheoriesType, TheoryType } from '../questionnaires/questionnaire_type';
import { useFetcher, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';

export const MultiTheoryChoices = function({theories}: {theories: TheoriesType}) {
    let set_theory_list = useMultiTheoryStore(x=>x.set_theory_list);

    let on_select = function(e: React.FormEvent<HTMLSelectElement>) {
        let options = e.currentTarget.selectedOptions;
        let v: TheoryType[] = [];

        for (let i = 0; i < options.length; i++) {
            let t = theories.theory.find(x=>x.id == options[i].value);

            if (t != null)
                v.push(t);
        }

        set_theory_list(v);
    }

    return (
    <div className="column">
        <h3>選擇多個理論進行分析(最大四個)</h3>
        
        <div className="select is-multiple">
            <select multiple={true} size={4} onChange={on_select}>
                {theories.theory.map((object, i) => <option value={object.id} key={object.id}>{object.name}</option>)}
        </select>
        </div>
    </div>)
}

export const MultiTheoryTextarea = function() {
    let set_user_info = useMultiTheoryStore(x=>x.set_user_info);

    let on_textarea_change = function(e: React.FormEvent<HTMLTextAreaElement>) {
        set_user_info(e.currentTarget.value);
    }

    let example_textarea = `範例
年齡：39，性別：女，種族：白人，已婚。為家庭和丈夫奉獻，但覺得生活乏味且失去自我。
想當小學老師，但恐慌和自我懷疑困擾著我。超重且無法減肥，經常因情緒過度飲食。
擔心孩子長大後生活空虛。曾因宗教問題與父母疏遠，
現在追求個人成長和定位，考慮接受心理治療，但害怕治療過程中的發現。
希望找到生活的意義和方向，但充滿恐懼和不安。`;

    return (
    <div className="column is-two-thirds">
        <h3>輸入個案資料</h3>
        
        <section>
            <pre>
                {example_textarea}
            </pre>
        </section>

        <div>
            <textarea className="textarea" onChange={on_textarea_change} placeholder="個人資料">
            </textarea>
        </div>
    </div>)
}

export const MultiTheoryInputView = function({theory}: {theory: TheoriesType}) {
    let selected_theory = useMultiTheoryStore(x=>x.selected_theory);
    let user_info = useMultiTheoryStore(x=>x.user_info);
    const fetcher = useFetcher({ key: "multi_theory_report" });
    const navigate = useNavigate();

    let on_analyze_click = function(e: React.MouseEvent<HTMLButtonElement>) {
        let data: any = {
            user_info: user_info,
            selected_theory: selected_theory
        };

        e.currentTarget.disabled = true; 
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
            e.currentTarget.disabled = false;
            return;   
        }    
    }

    useEffect(() => {
        console.log(fetcher)

        if (fetcher.state == 'idle' && fetcher.data != null) {
            console.log(fetcher.data)
            let data: any = fetcher.data;

            navigate("/multi_theory/analysis_report", {
                replace: false,
                relative: "route",
                state: fetcher.data,
            });
        }
    }, [fetcher]);

    return (
        <div className="container multi_theory_input">
            <div className="columns">
                <MultiTheoryChoices theories={theory}></MultiTheoryChoices>
                <MultiTheoryTextarea></MultiTheoryTextarea>
            </div>
            <button className='button is-fullwidth is-primary is-light'
            disabled={selected_theory.length <= 0 || user_info.length < 10}
            onClick={on_analyze_click}
            >開始分析</button>
        </div>
    )
}