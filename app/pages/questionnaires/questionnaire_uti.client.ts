import { THEORY_REPORT_TEXT, USER_INFO_TEXT } from "~/utility/static_text";
import { UserMetaType } from "./questionnaire_type";

export let get_short_usermeta_object = function()  {
    let age_element = document.querySelector<HTMLInputElement>('.short_theory_form input[name="age"]')
    let gender_element = document.querySelector<HTMLSelectElement>('.short_theory_form select[name="gender"]')
    let theme_element = document.querySelector<HTMLInputElement>('.short_theory_form input[name="theme"]')
    let expectation_element = document.querySelector<HTMLInputElement>('.short_theory_form input[name="expectation"]')

    let age = (age_element?.value == undefined || age_element?.value == '') ? 18: Number.parseInt(age_element.value);
    let gender = (gender_element?.value == undefined) ? 'it': gender_element.value;
    let theme = (theme_element?.value == undefined) ? '': theme_element.value;
    let expectation = (expectation_element?.value == undefined) ? '': expectation_element.value;

    let meta : UserMetaType = {
        age: age, gender: gender, counseling_session: theme, session_expectation: expectation
    }

    return meta;
};

export let group_user_input_theory_quiz = function(user_inputs: any[]) {
   let group_user_theory_quiz = ''
   
    user_inputs.forEach(user_input => {
        let custom_text = THEORY_REPORT_TEXT + ''
        custom_text = custom_text.replace('{question}', user_input.questionnaire)
        custom_text = custom_text.replace('{user_answer}', user_input.content)

        group_user_theory_quiz += custom_text + '\n'
    }) 
    
    return group_user_theory_quiz
}

export let group_user_persoanl_info = function(user_info: UserMetaType) {
    let custom_text = USER_INFO_TEXT + ''
    custom_text = custom_text.replace('{gender}', user_info.gender)
    custom_text = custom_text.replace('{age}', (user_info.age).toString())
    custom_text = custom_text.replace('{theme}', user_info.counseling_session)
    custom_text = custom_text.replace('{expect}', user_info.session_expectation)

    return custom_text
}
