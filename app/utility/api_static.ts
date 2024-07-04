const Domain = 'https://psycho-councel.ddns.net/'
const Self = 'http://localhost:8842/'

export const Basic_Docs_Template = '/docs_template/basic_template.docx'

export const API = Object.freeze({
    'GetCognitiveBehavior': 'questionnaire/get_cognitive_questions',
    'GetObjectRelationsTheory': 'questionnaire/get_theory_questions',
    'UploadUserQuestionnaire': 'questionnaire/output_theory_report',
    'UploadTheoryReport': 'questionnaire/output_mediation_strategy',
});

export const GetDomain = function(url: string) {
    return Self + url;
}