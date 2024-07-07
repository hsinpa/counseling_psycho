export interface QuestionFormType {
    content: string,
    type?: string, 
    id: string
}

export interface TheoryReportType {
    content: string,
    role: string
}

export interface UserMetaType {
    gender: string,
    age: number,
    counseling_session: string,
    session_expectation: string
}