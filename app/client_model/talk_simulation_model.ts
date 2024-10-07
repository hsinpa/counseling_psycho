import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TalkSimulationState = {
    age: number,
    gender: string,
    job: string,
    education: string,
    theme_checkboxes: string[],

    theme_reason: string,
    sorting_reason: string,

    set_age: (age: number) => void,
    set_gender: (gender: string) => void,
    set_education: (education: string) => void,
    set_job: (job: string) => void,

    set_checkboxes: (boxes: string[]) => void,
    set_theme_reason: (reason: string) => void,
    set_sorting_reason: (reason: string) => void,
}

export const useaTalkSimulationStore = create<TalkSimulationState>()(
    immer((set) => ({
        age: 18,
        gender: 'male',
        job: '',
        education: 'university',
        theme_checkboxes: [],
        theme_reason: '',
        sorting_reason: '',

        set_age: (age: number) => set((state) => {state.age = age } ),
        set_gender: (gender: string) => set((state) => { state.gender = gender } ),
        set_education: (education: string) => set((state) => {state.education = education } ),
        set_job: (job: string) => set((state) => { state.job =job } ),

        set_checkboxes: (boxes: string[]) => set((state) => {
            state.theme_checkboxes = boxes;
        }),

        set_theme_reason: (reason: string) => set((state) => {
            state.theme_reason = reason;
        }),

        set_sorting_reason: (reason: string) => set((state) => {
            state.sorting_reason = reason;
        }),
        
    })),
)
