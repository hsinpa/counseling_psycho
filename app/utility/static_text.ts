export const Questionaries = [
    "請描述你的家庭背景和成長環境，並分享這些對你的影響為何",
    "請描述你目前的生活、工作與家庭狀況。",
    "你過去是否接受過心理諮商?若有的話，請大概說明第一次接受心理諮商的時間、地點、原因等。",
    "你過去是否有在身心科就診過?若有的話，請大概說明第一次就診身心科的時間、地點、診斷、用藥狀況等。",
    "你認為自己最大的優點是什麼?為什麼?",
    "你通常在關係中扮演怎麼樣的角色?",
    "你對未來有什麼目標或期待?",
    "在你7歲以前、對你來說最重要的人是誰?你與對方的關係如何呢?你們通常如何相處呢?",
    "面對對你來說重要的人或關係，你有什麼樣的期待或需求"
]

export const QuestionaireFormTemplate = {
    "user_meta": {
        "gender": "男",
        "age": 35,
        "counseling_session": "壓力管理與焦慮處理",
        "session_expectation": "希望能夠更好地管理壓力和焦慮，找到平衡工作和家庭生活的方法。同時，我也希望能在個人成長方面有所提升，學會更有效地處理情緒和人際關係的挑戰。"
    },
    "theory": "object_relation_theory",
    "question_answer_pairs" : [{}]
}

export const USER_INFO_TEXT = `用戶性別: {gender}
年紀: {age}
會談主題: {theme}
會談期待: {expect}`

export const THEORY_REPORT_TEXT = `
心理師問題: {question}
用戶回答: {user_answer}`;

export const SETTING = {
    MAX_TOKEN: 1500
}