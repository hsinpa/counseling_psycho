const Domain = 'https://psycho-councel.ddns.net/'
const Self = 'http://127.0.0.1:8842/'

const Remote_WSS = 'wss://psycho-councel.ddns.net/ws'
const Local_WS = 'ws://127.0.0.1:8842/ws'

export const Basic_Docs_Template = '/docs_template/basic_template.docx'

export const API = Object.freeze({
    'GetCognitiveBehavior': 'api/questionnaire/get_cognitive_questions',
    'UploadCognitiveReport': 'api/questionnaire/output_cognitive_report',
    'OutputCognitiveIndividual': 'api/questionnaire/output_cognitive_individual',

    'GetObjectRelationsTheory': 'api/questionnaire/get_theory_questions',
    'UploadUserQuestionnaire': 'api/questionnaire/output_theory_report',
    'UploadTheoryReport': 'api/questionnaire/output_mediation_strategy',

    'GetMultiTheory': 'api/multi_theory/get_multi_theory',
    'UploadMultiTheory': 'api/multi_theory/output_multi_theory_report',
    'UploadMixTheory': 'api/multi_theory/output_mix_theory_report',

    'GetSimulationTalk': 'api/talk_simulation/get_simulation_talk/{0}',
    'GetSimulationCheckboxes': 'api/talk_simulation/get_simulation_checkboxes',
    'GetSimulationAnswer': 'api/talk_simulation/gen_simulation_answer/{0}',

    'GenerateSimulationQuiz': 'api/talk_simulation/gen_simulation_quiz',
    'UpdateSimulationQuiz': 'api/talk_simulation/update_simulation_quiz',
    'GenerateSimulationReport': 'api/talk_simulation/sgen_simulation_report',
});

export const GetDomain = function(url: string) {
    return import.meta.env.VITE_API_DOMAIN + url;
}

export const GetWSS = function() {
    return import.meta.env.VITE_WSS_DOMAIN;
}

export const SocketEvent = Object.freeze({
    bot: 'bot',
    open: 'socket_open'
})