const Domain = 'https://psycho-councel.ddns.net/'
const Self = 'http://127.0.0.1:8842/'

export const WSS = 'wss://psycho-councel.ddns.net/ws/{0}'
export const WS = 'ws://127.0.0.1:8842/ws/{0}'

export const Basic_Docs_Template = '/docs_template/basic_template.docx'

export const API = Object.freeze({
    'GetCognitiveBehavior': 'questionnaire/get_cognitive_questions',
    'UploadCognitiveReport': 'questionnaire/output_cognitive_report',
    'OutputCognitiveIndividual': 'questionnaire/output_cognitive_individual',

    'GetObjectRelationsTheory': 'questionnaire/get_theory_questions',
    'UploadUserQuestionnaire': 'questionnaire/output_theory_report',
    'UploadTheoryReport': 'questionnaire/output_mediation_strategy',

    'GetMultiTheory': 'multi_theory/get_multi_theory',
    'UploadMultiTheory': 'multi_theory/output_multi_theory_report',
    'UploadMixTheory': 'multi_theory/output_mix_theory_report',
});

export const GetDomain = function(url: string) {
    return Domain + url;
}