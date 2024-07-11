import { useMultiTheoryStore } from '~/client_model/multi_theory_model';
import './multi_theory.scss'
import { TheoriesType, TheoryType } from '../questionnaires/questionnaire_type';
import { useFetcher, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { MultiTheoryTextarea } from './multi_theory_inputs';

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
        
        <section className='theory_checkboxs'>
            {theories.theory.map((object, i) => {
                return (
                <label className="checkbox">
                    <input type="checkbox" className='thoery_checkbox' value={object.id} key={object.id} />
                    <span>{object.name}</span>
                </label>)
            })}

        </section>
    </div>)
}

export const MixTheoryInputView = function({theory}: {theory: TheoriesType}) {
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