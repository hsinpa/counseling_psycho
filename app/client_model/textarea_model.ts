import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface TextareaType {
    id: string,
    body: string,
    valid: boolean
}

type TextareaTypeState = {
    textarea_dict: Map<string, TextareaType>,

    set_textarea_dict: (id: string, info: TextareaType) => void,
}

export const useTextareaTypeStore = create<TextareaTypeState>()(
    immer((set) => ({
        textarea_dict: new Map(),
        set_textarea_dict: (id: string, info: TextareaType) => set((state) => {
            return state.textarea_dict.set(id, info);
        }),
    })),
)
