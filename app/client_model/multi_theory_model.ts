import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { TheoryType } from '~/pages/questionnaires/questionnaire_type';

type MultiTheoryState = {
    selected_theory: TheoryType[],
    user_info: string,
    set_theory_list: (t: TheoryType[]) => void,
    set_user_info: (info: string) => void,
}

export const useMultiTheoryStore = create<MultiTheoryState>()(
    immer((set) => ({
        selected_theory: [],
        user_info: '',

        set_theory_list: (t: TheoryType[]) => set((state) => {
            state.selected_theory = [...t];
        }),
        set_user_info: (info: string) => set((s) => {
            s.user_info = info;
        })
    })),
)
