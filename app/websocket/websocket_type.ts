export interface StreamingType {
    event: string,
    session_id: string,
    data: string,
    type: 'complete' | 'chunk'
}