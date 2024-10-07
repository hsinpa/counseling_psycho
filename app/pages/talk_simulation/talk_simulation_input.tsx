import { API, GetDomain } from '~/utility/api_static'
import './talk_simulation.scss'
import { SimulationThemeCheckboxType } from './talk_simulation_type'
import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'


export let RenderTalkSimulationInputUI = function({checkboxes}: {checkboxes: SimulationThemeCheckboxType[]}) {
    return (
        <div className="simulation_input_container">
            <div className="simulation_input_row">
                <RenderBasicInfoTextForm></RenderBasicInfoTextForm>
                <RenderBasicThemeCheckbox checkboxes={checkboxes}></RenderBasicThemeCheckbox>
            </div>
        </div>
    )
}


let RenderBasicInfoTextForm = function() {
    return (
    <div className="simulation_input_info_text">
        <h2 className='title'>基本資料</h2>

        <section>
            <div className="field">
                <label className="label">您的年齡</label>
                <input className="input" name="age" type='number' placeholder="年齡"></input>
            </div>

            <div className="field">
                <label className="label">性別</label>
                <div className="select">
                    <select name='gender'>
                        <option value='Male'>男</option>
                        <option value='Female'>女</option>
                        <option value='Both'>其他</option>
                    </select>
                </div>
            </div>

            <div className="field">
                <label className="label">職業</label>
                <input className="input" name="theme" type='text' placeholder="輸入主題"></input>
            </div>

            <div className="field">
                <label className="label">最高學歷</label>
                <div className="select">
                    <select name='gender'>
                        <option>無</option>
                        <option>高中</option>
                        <option>大學</option>
                        <option>研究所以上</option>
                    </select>
                </div>
            </div>
        </section>
    </div>)
}

let RenderBasicThemeCheckbox = function({checkboxes}: {checkboxes: SimulationThemeCheckboxType[]}) {
    
    let theme_checkboxes = [];
    for (let checkbox of checkboxes) {
        theme_checkboxes.push(
            <div key={checkbox.id} className='checkbox_item'>
                <input type="checkbox" id={checkbox.id} name={checkbox.id} />
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
