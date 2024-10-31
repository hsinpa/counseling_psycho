import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { TheoryType } from '~/pages/questionnaires/questionnaire_type';

type MultiTheoryState = {
    selected_theory: TheoryType[],
    user_info: string,
    word_validation: boolean,
    
    set_theory_list: (t: TheoryType[]) => void,
    set_user_info: (info: string) => void,
    set_word_validation: (validation: boolean) => void,
}

export const useMultiTheoryStore = create<MultiTheoryState>()(
    immer((set) => ({
        selected_theory: [],
        user_info: '',
        word_validation: false,

        set_theory_list: (t: TheoryType[]) => set((state) => {
            state.selected_theory = [...t];
        }),
        set_user_info: (info: string) => set((s) => {
            s.user_info = info;
        }),
        set_word_validation: (validation: boolean) => set((s) => {
            s.word_validation = validation;
        }),
    })),
)
