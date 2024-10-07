import { API, GetDomain } from '~/utility/api_static'
import './talk_simulation.scss'
import { SimulationThemeCheckboxType } from './talk_simulation_type'
import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useaTalkSimulationStore } from '~/client_model/talk_simulation_model'


export let RenderTalkSimulationInputUI = function({checkboxes}: {checkboxes: SimulationThemeCheckboxType[]}) {
    let set_theme_reason = useaTalkSimulationStore(s=>s.set_theme_reason);
    let set_sorting_reason = useaTalkSimulationStore(s=>s.set_sorting_reason);
    let sorting_reason = useaTalkSimulationStore(s=>s.sorting_reason);
    let theme_reason = useaTalkSimulationStore(s=>s.theme_reason);

    return (
        <div className="simulation_input_container">
            <div className="simulation_input_row">
                <RenderBasicInfoTextForm></RenderBasicInfoTextForm>
                <RenderBasicThemeCheckbox checkboxes={checkboxes}></RenderBasicThemeCheckbox>
            </div>
            <div className="simulation_input_row">
                 <RenderTextarea title='選擇這些主題的原因:' textarea_val={theme_reason} on_textarea_change={set_theme_reason} ></RenderTextarea>
                 <RenderTextarea title='這樣排序的原因:' textarea_val={sorting_reason} on_textarea_change={set_sorting_reason} ></RenderTextarea>
            </div>
        </div>
    )
}


let RenderBasicInfoTextForm = function() {
    const simulationStore = useaTalkSimulationStore();

    return (
    <div className="simulation_input_info_text">
        <h2 className='title'>基本資料</h2>

        <section>
            <div className="field">
                <label className="label">您的年齡</label>
                <input className="input" name="age" type='number' placeholder="年齡" value={simulationStore.age}
                onChange={x=>simulationStore.set_age(Number.parseInt(x .target.value))}></input>
            </div>

            <div className="field">
                <label className="label">性別</label>
                <div className="select">
                    <select name='gender' value={simulationStore.gender} 
                    onChange={x=>simulationStore.set_gender(x.target.value)}>
                        <option value='male' >男</option>
                        <option value='female' >女</option>
                        <option value='both' >其他</option>
                    </select>
                </div>
            </div>

            <div className="field">
                <label className="label">職業</label>
                <input className="input" name="theme" type='text' placeholder="輸入職業" value={simulationStore.job}
                onChange={x=>simulationStore.set_job(x.target.value)}></input>
            </div>

            <div className="field">
                <label className="label">最高學歷</label>
                <div className="select">
                    <select name='gender' 
                    value={simulationStore.education}
                    onChange={x=> simulationStore.set_education(x.target.value)}>
                        <option value={'university'} >大學</option>
                        <option value={'high_school'} >高中</option>
                        <option value={'master_or_above'} >研究所以上</option>
                        <option value={'below_high_school'} >高中以下</option>
                    </select>
                </div>
            </div>
        </section>
    </div>)
}

let RenderBasicThemeCheckbox = function({checkboxes}: {checkboxes: SimulationThemeCheckboxType[]}) {
    const MAX_SELECTION = 3;
    const set_selected_boxes = useaTalkSimulationStore(s=>s.set_checkboxes);
    const selected_boxes = useaTalkSimulationStore(s=>s.theme_checkboxes);

    let on_checkbox_change = function(e: React.FormEvent<HTMLInputElement>) {
        let target: HTMLInputElement = e.target as (HTMLInputElement);

        if (target.checked && selected_boxes.length + 1 > MAX_SELECTION) {
            e.preventDefault();
            return;
        };
        
        if (!target.checked) {
            set_selected_boxes(selected_boxes.filter(x=>x!=target.id));
        } else {
            set_selected_boxes([...selected_boxes, target.id]);
        }
    }

    let theme_checkboxes = [];
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i];
        let is_checked = selected_boxes.findIndex(x=>x == checkbox.id) >= 0;
        let is_disable = selected_boxes.length >= MAX_SELECTION && !is_checked;

        theme_checkboxes.push(
            <div key={checkbox.id} className='checkbox_item'>
                <input type="checkbox" id={checkbox.id} name={checkbox.id} onChange={on_checkbox_change}
                checked={is_checked} disabled={is_disable}/>
                <label htmlFor={checkbox.id}>{checkbox.ch_name}</label> 
            </div>
        )
    }

    return (
        <div className="simulation_input_theme_checkbox">
            <h2 className='title'>會談主題</h2>

            <fieldset>
                <legend>選擇三個主要的困擾並排序</legend>

                <section>
                    {theme_checkboxes}
                </section>
            </fieldset>
        </div>
    );    
}

let RenderTextarea = function({title, textarea_val, on_textarea_change}: {
    title: string, textarea_val: string, on_textarea_change: (text_input: string) => void} ) {
        
    return (
    <div className='simulation_textarea'>
        <h3>{title}</h3>
        <textarea onChange={x => on_textarea_change(x.target.value)}value={textarea_val}></textarea>
    </div>);
}