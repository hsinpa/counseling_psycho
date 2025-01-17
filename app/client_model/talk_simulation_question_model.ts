import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { SimulationQuestionnaireType } from "~/pages/talk_simulation/talk_simulation_type"

type TalkSimulationQuestionState = {
    questionnaires: SimulationQuestionnaireType[],
    process_count: number,

    set_process_count: (c: number) => void,
    set_questionnaires: (questionnaires: SimulationQuestionnaireType[]) => void,
    answer_questionnaire: (target_index: number, answer: string) => void,
}

export const useaTalkSimulationQuestionStore = create<TalkSimulationQuestionState>()(
    immer((set) => ({
        questionnaires: [],
        process_count: 0,

        set_process_count: (c: number) => set((state) => {
            state.process_count = c;
        }),
        set_questionnaires: (questionnaires: SimulationQuestionnaireType[]) => set((state) => {
            state.questionnaires = questionnaires;
        }),

        answer_questionnaire: (target_index: number, answer: string) => set((state) => {
            if (target_index >= 0 && target_index < state.questionnaires.length) {
                state.questionnaires[target_index].answer = answer;
            }
        }),

    })),
)
