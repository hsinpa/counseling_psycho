import { TheoryReportType } from "./questionnaire_type";
import './questionarie.scss'
import { generate_document } from "~/utility/docs_exporter.client";
import { useEffect, useState } from "react";
import { Basic_Docs_Template } from "~/utility/api_static";

export let MediationStrategyView = function({report } : {report: string}) {
    const [docs_url, set_docs_url] = useState('');

    useEffect(() => {
        set_docs_url(window.location.origin + Basic_Docs_Template);
    }, []);
    
    let on_export_btn = function() {
        generate_document(docs_url, '治療策略報告', report);
    }

    return (
        <div className="container theory_report">        
            <button className="export_btn button" onClick={on_export_btn}>匯出檔案</button>

            <section className='report_title'>
                <h2 className="title">治療策略報告</h2>
                <p>個案各項數據</p>
            </section>

            <pre className="content">
                {report}
            </pre>
        </div>
    );
}