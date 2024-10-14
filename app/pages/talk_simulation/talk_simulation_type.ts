export interface SimulationThemeCheckboxType {
    id: string,
    ch_name: string,
    en_name: string
}

export interface SimulationQuestionnaireType {
    type: 'text' | 'label' | 'number',
    content: string,
    answer?: string
}

export interface SimulationResultType {
    id: string, 
    process_count: number, 
    report: string,
    report_flag: boolean,
    questionnaires: SimulationQuestionnaireType[]
}

export enum SimTalkActionType {
    report = "report", // Generate report
    questionnaire = "questionnaire", // Create new questionnaire
}