import { Fragment, useEffect, useState } from "react";
import { TheoryResp } from "../questionnaires/questionnaire_type";
import './multi_theory.scss'
import { Basic_Docs_Template } from "~/utility/api_static";
import { generate_document } from "~/utility/docs_exporter.client";

const MultiTheoryTabs = function({theories, active_index, callback}:
        {theories: TheoryResp[], active_index: number, callback: React.Dispatch<React.SetStateAction<number>>}) {
    
    let list_dom = theories.map( (x, i)=> <li onClick={() => {callback(i)}} key={x.theory_id}
                                            className={i == active_index ? 'is-active': ''}><a>{x.theory_name}</a>
                                            </li>);

    return (
        <div className="tabs">
        <ul>
            {list_dom}
        </ul>
        </div>
    )
}

const MultiContent = function({theory}: {theory: TheoryResp }) {
    if (theory == null || theory.content == null)
        return (<Fragment></Fragment>);
    const [docs_url, set_docs_url] = useState('');

    useEffect(() => {
        set_docs_url(window.location.origin + Basic_Docs_Template);
    }, []);

    const on_export_btn = function() {
        generate_document(docs_url, '個案分析報告 - ' + theory.theory_name, theory.content);
    }

return (
    <div className="content">
        <button className="button" onClick={on_export_btn}>匯出檔案</button>
        <pre>{theory.content}</pre>
    </div>
)
}



export const MultiTheoryReportView = function({theories}: {theories: TheoryResp[]}) {
    const [active_thoery_index, set_theory_index] = useState<number>(0);

    return (<div className="container multi_theory_report">
        <MultiTheoryTabs theories={theories} active_index={active_thoery_index} callback={set_theory_index}></MultiTheoryTabs>
        <MultiContent theory={theories[active_thoery_index]} ></MultiContent>
    </div>)
}