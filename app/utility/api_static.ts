const Domain = 'https://psycho-councel.ddns.net/'
const Self = 'http://127.0.0.1:8842/'

export const WSS = 'wss://psycho-councel.ddns.net/ws'
export const WS = 'ws://127.0.0.1:8842/ws'

export const Basic_Docs_Template = '/docs_template/basic_template.docx'

export const API = Object.freeze({
    'GetCognitiveBehavior': 'questionnaire/get_cognitive_questions',
    'UploadCognitiveReport': 'questionnaire/output_cognitive_report',
    'OutputCognitiveIndividual': 'questionnaire/output_cognitive_individual',

    'GetObjectRelationsTheory': 'questionnaire/get_theory_questions',
    'UploadUserQuestionnaire': 'questionnaire/output_theory_report',
    'UploadTheoryReport': 'questionnaire/output_mediation_strategy',
});

export const GetDomain = function(url: string) {
    return Self + url;
}