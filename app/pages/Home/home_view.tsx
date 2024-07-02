import './home.scss'
import case_study_img from '../../assets/UI/case-study.png';
import report_img from '../../assets/UI/report.png';
import { Link } from '@remix-run/react';


export let render_action_comp = function(title: string, content: string, link: string, sprite_url: string) {
    return (    <div className='home_action_comp'>
        <img src={sprite_url}></img>
        <h3>{title}</h3>
        <p>{content}</p>
        <Link to={link} className='button'>進入測驗 {'>>'}</Link>
    </div>);
}

export default function Home_View() {
    return (
        <div className='home_actions container'>
            <section>
                {render_action_comp('單一理論個案概念化', '選擇一種理論，輸入個案資料後針對該理論所有向度進行分析，輸出個案分析報告與治療策略報告', '/single_concept_selection', case_study_img)}
                {render_action_comp('多種理論分析', '選擇多種理論，輸入個案資料，針對每個理論的每個向度輸出治療目的、治療方法，並針對每個理論的每個向度推薦治療師多個可以與個案討論的問題', '#', case_study_img)}
                {render_action_comp('融合理論分析', '指定任意兩種理論進行融合，在多個向度使用融合理論分析，輸出治療目的、治療方法，並針對不同向度推薦治療師多個可以與個案討論的問題', '#', report_img)}
            </section>
        </div>
    );
}