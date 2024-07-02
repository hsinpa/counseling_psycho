import './home.scss'
import case_study_img from '../../assets/UI/case-study.png';
import report_img from '../../assets/UI/report.png';
import { Link } from '@remix-run/react';
import { render_action_comp } from './home_view';


export default function Single_Concept_View() {
    return (
        <div className='home_actions container'>
            <h2>單一理論個案概念化</h2>
            <p>選擇要使用的心理學理論 -{'>'} 回答每個出現的問題 -{'>'} 輸出個案分析報告 -{'>'} 輸出治療策略</p>

            <section>
                {render_action_comp('客體關係理論', '客體關係理論是一種心理學理論，認為我們早年和父母或照顧者的關係會影響我們的心靈和未來的人際關係。這些早期經歷會在我們心裡留下「印記」，影響我們如何看待和處理各種情感和人際互動。', '/object_relation_theory', case_study_img)}
                {render_action_comp('認知行為療法', '身體經驗創傷療法是一種透過觀察和感受身體反應來釋放創傷的方法，幫助人們從壓力和情緒困擾中恢復。讓身體帶領心靈走出創傷，重拾內在的平靜和力量。', '#', report_img)}
                {render_action_comp('完形治療法', '完形治療法強調個體在當下的經驗和感受，並鼓勵全身心的自我覺察與自我表達。這種治療方法強調個人對其生活的主動參與和責任，通過探索未解決的情感和未完成的情境來達成心理健康和成長。', '#', report_img)}
            </section>
        </div>
    );
}