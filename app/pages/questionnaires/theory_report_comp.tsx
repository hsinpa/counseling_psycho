import { TheoryReportType } from "./questionnaire_type";
import './questionarie.scss'
import { useFetcher, useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export let TheoryReportView = function({report } : {report: string}) {
    const navigate = useNavigate();
    const fetcher = useFetcher({ key: "gen_mediate_strategy" });
    
    useEffect(() => {
        console.log(fetcher)

        if (fetcher.state == 'idle' && fetcher.data != null) {
            console.log(fetcher.data)

            navigate("/object_relation_theory/mediation_strategy", {
                replace: false,
                relative: "route",
                state: fetcher.data,
            });
        }
    }, [fetcher])


    let on_submit_button = async function() {
        let button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.theory_report button');
        let data = {content: report};
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

    return (
        <div className="container theory_report">
            <section className='report_title'>
                <h2 className="title">輸出個案分析報告</h2>
                <p>個案各項數據</p>
            </section>

            <pre>
                {report}
            </pre>

            <button className="button is-fullwidth is-info is-light" onClick={on_submit_button}>輸出治療策略</button>
        </div>
    );
}