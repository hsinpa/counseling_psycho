import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type MultiTheoryState = {
    selected_theory: string[],
    user_info: string,
    set_theory_list: (t: string[]) => void,
    set_user_info: (info: string) => void,
}

export const useMultiTheoryStore = create<MultiTheoryState>()(
    immer((set) => ({
        selected_theory: [],
        user_info: '',

        set_theory_list: (t: string[]) => set((state) => {
            state.selected_theory = [...t];
        }),
        set_user_info: (info: string) => set((s) => {
            s.user_info = info;
        })
    })),
)
