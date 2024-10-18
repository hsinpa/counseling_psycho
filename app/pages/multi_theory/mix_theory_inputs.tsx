import { useMultiTheoryStore } from '~/client_model/multi_theory_model';
import './multi_theory.scss'
import { TheoriesType, TheoryType } from '../questionnaires/questionnaire_type';
import { redirect, useFetcher, useNavigate } from '@remix-run/react';
import { useContext, useEffect } from 'react';
import { MultiTheoryTextarea } from './multi_theory_inputs';
import { wsContext } from '~/root';
import { v4 as uuidv4 } from 'uuid';

export const MultiTheoryChoices = function({theories}: {theories: TheoriesType}) {
    let set_theory_list = useMultiTheoryStore(x=>x.set_theory_list);
    let selected_theory = useMultiTheoryStore(x=>x.selected_theory);
    const select_all_key = 'auto_select';

    let on_select = function(e: React.FormEvent<HTMLInputElement>) {
        let target_dom: HTMLInputElement = e.target as HTMLInputElement;
        let checkboxes_dom = document.querySelectorAll<HTMLInputElement>('.thoery_checkbox');

        if (target_dom.value == select_all_key) {
            let t = theories.theory.find(x=>x.id == select_all_key);
            for (let i = 0; i < checkboxes_dom.length; i++) {
                checkboxes_dom[i].checked = (checkboxes_dom[i].value == select_all_key);
            }

            if (t != null) set_theory_list([t]);
            return;
        }

        let theory_checkboxes: TheoryType[] = []; 
        for (let i = 0; i < checkboxes_dom.length; i++) {
            let t = theories.theory.find(x=>x.id == checkboxes_dom[i].value);
            if (t == null) continue;

            if (t.id==select_all_key) {
                checkboxes_dom[i].checked = false;
                continue;
            }

            if (theory_checkboxes.length < 3 && checkboxes_dom[i].checked) {
                theory_checkboxes.push(t);
            } else {
                checkboxes_dom[i].checked = false;
            }
        }
        
        set_theory_list(theory_checkboxes);
    }

    return (
    <div className="column">
        <h3>選擇三種理論進行融合</h3>
        
        <section className='theory_checkboxs'>
            {theories.theory.map((object, i) => {
                return (
                <label className="checkbox" key={object.id}>
                    <input type="checkbox" onChange={on_select} className='thoery_checkbox' value={object.id} key={object.id} />
                    <span>{object.name}</span>
                </label>)
            })}

        </section>
    </div>)
}

export const MixTheoryInputView = function({theory}: {theory: TheoriesType}) {
    let set_theory = useMultiTheoryStore(x=>x.set_theory_list);
    let selected_theory = useMultiTheoryStore(x=>x.selected_theory);
    let user_info = useMultiTheoryStore(x=>x.user_info);
    const fetcher = useFetcher({ key: "mix_theory_report" });
    let websocket = useContext(wsContext)

    let on_analyze_click = function(e: React.MouseEvent<HTMLButtonElement>) {
        if (websocket != null) {
            console.log('socket id', websocket.id);
        }
        console.log('websocket', websocket);

        let data: any = {
            user_info: user_info,
            selected_theory: selected_theory,
            user_id: websocket?.id,
            session_id: uuidv4()
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

    let on_fetch_return = function() {
        return redirect('/mix_theory/analysis_report')
    }

    useEffect(() => {
        console.log('websocket', websocket);

        return () => {
        }
    }, [websocket])

    useEffect(() => {

        return () => {
            set_theory([]);
        }
    }, [])

    useEffect(() => {
        console.log(fetcher)

        if (fetcher.state == 'idle' && fetcher.data != null) {
            console.log('MixTheoryInputView MixTheory', JSON.stringify(fetcher.data));
            localStorage.setItem('user_report', JSON.stringify(fetcher.data));
            // window.location.href="/mix_theory/analysis_report";
            on_fetch_return();
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