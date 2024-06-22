const Domain = 'http://35.202.220.203:8878/'
const Self = '/'

export const API = Object.freeze({
    'GetObjectRelationsTheory': 'questionnaire/ObjectRelationsTheory',
    'UploadUserQuestionnaire': 'questionnaire/ObjectRelationsTheory',
    'UploadTheoryReport': 'questionnaire/ObjectRelationsTheory/analysis',
});

export const GetDomain = function(url: string) {
    return Domain + url;
}