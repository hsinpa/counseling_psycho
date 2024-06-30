const Domain = 'http://localhost:8842/'
const Self = '/'

export const API = Object.freeze({
    'GetObjectRelationsTheory': 'questionnaire/get_theory_questions',
    'UploadUserQuestionnaire': 'questionnaire/output_theory_report',
    'UploadTheoryReport': 'questionnaire/output_mediation_strategy',
});

export const GetDomain = function(url: string) {
    return Domain + url;
}