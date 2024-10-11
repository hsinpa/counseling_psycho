import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { SimulationQuestionnaireType } from "~/pages/talk_simulation/talk_simulation_type"

type TalkSimulationQuestionState = {
    questionnaires: SimulationQuestionnaireType[],

    set_questionnaires: (questionnaires: SimulationQuestionnaireType[]) => void,
    answer_questionnaire: (target_index: number, answer: string) => void,
}

export const useaTalkSimulationQuestionStore = create<TalkSimulationQuestionState>()(
    immer((set) => ({
        questionnaires: [],
        
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
