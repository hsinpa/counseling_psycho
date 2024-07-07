import './questionarie.scss'
import { useFetcher, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { generate_document } from "~/utility/docs_exporter.client";
import { Basic_Docs_Template } from "~/utility/api_static";

export let TheoryReportView = function({report, individual_analysis_input, next_page_url} : 
    {report: string, individual_analysis_input: string, next_page_url: string}) {
    const navigate = useNavigate();
    const fetcher = useFetcher({ key: "gen_mediate_strategy" });
    const [docs_url, set_docs_url] = useState('');

    useEffect(() => {
        set_docs_url(window.location.origin + Basic_Docs_Template);
    }, []);

    useEffect(() => {
        if (fetcher.state == 'idle' && fetcher.data != null) {
            console.log(fetcher.data)

            navigate(next_page_url, {
                state: fetcher.data,
            });
        }
    }, [fetcher])


    let on_submit_button = async function() {
        let button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.theory_report .individual_analysis_btn');
        let data = {content: individual_analysis_input, theory: 'object_relation_theory'};
        if (button == null) return;

        console.log('TheoryReportView', data);
        console.log(button)
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

    let on_export_btn = function() {
        generate_document(docs_url, '個案分析報告', report);
    }

    return (
        <div className="container theory_report">
            <button className="export_btn button" onClick={on_export_btn}>匯出檔案</button>

            <section className='report_title'>
                <h2 className="title">輸出個案分析報告</h2>
                <p>個案各項數據</p>
            </section>

            <pre>
                {report}
            </pre>

            <button className="button is-fullwidth is-info is-light individual_analysis_btn" onClick={on_submit_button}>輸出治療策略</button>
        </div>
    );
}