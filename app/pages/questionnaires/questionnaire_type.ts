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

export interface TheoryType {
    id: string,
    name: string,
    dimension: string[]
}

export interface TheoriesType {
    theory: TheoryType[],
}

export interface TheoryResp {
    content: string,
    theory_id: string,
    theory_name: string,
    id: string
}