import { TheoryReportType } from "./questionnaire_type";
import './questionarie.scss'

export let MediationStrategyView = function({report } : {report: string}) {

    return (
        <div className="container theory_report">
            <section className='report_title'>
                <h2 className="title">輸出個案分析報告</h2>
                <p>個案各項數據</p>
            </section>

            <pre className="content">
                {report}
            </pre>
        </div>
    );
}