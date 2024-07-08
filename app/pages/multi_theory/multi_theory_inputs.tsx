import './multi_theory.scss'

export const MultiTheoryChoices = function() {

    return (
    <div className="column">
        <h3>選擇三種理論進行融合</h3>
        
        <div className="select is-multiple">
            <select multiple={true}>
                <option value="all">全選</option>
                <option value="Argentina">認知行為療法</option>
                <option value="Bolivia">客體關係理論</option>
                <option value="Brazil">阿德勒心理學</option>
                <option value="Chile">完形治療法</option>
                <option value="Colombia">精神分析</option>
                <option value="Ecuador">敘事分析</option>
                <option value="Guyana">系統家庭療法</option>
                <option value="Paraguay">存在主義理論</option>
        </select>
        </div>

    </div>)
}

export const MultiTheoryTextarea = function() {

    return (
    <div className="column is-two-thirds">
        <h3>輸入個案資料</h3>
        
        <div>
            <textarea className="textarea" placeholder="e.g. Hello world">

            </textarea>
        </div>

    </div>)
}

export const MultiTheoryInputView = function() {

    return (
        <div className="container multi_theory_input">
            <div className="columns">
                <MultiTheoryChoices></MultiTheoryChoices>
                <MultiTheoryTextarea></MultiTheoryTextarea>
            </div>
        </div>
    )

}