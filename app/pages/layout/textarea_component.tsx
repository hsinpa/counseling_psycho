import llamaTokenizer from "llama-tokenizer-js";
import { Fragment, useState } from "react";
import { useTextareaTypeStore } from "~/client_model/textarea_model";
import { SETTING } from "~/utility/static_text";

export const Textarea_Component = function({textarea_id}: {textarea_id: string}) {
    let textareaStore = useTextareaTypeStore();
    let textarea_info = textareaStore.textarea_dict.get(textarea_id);
    if (textarea_info == undefined) {
        textarea_info = {
          id: textarea_id, body: '', valid: true  
        }
        textareaStore.set_textarea_dict(textarea_id, textarea_info);
    }


    let error_message_dom = <Fragment></Fragment>
    if (!textarea_info.valid)
        error_message_dom = (<div><p className="tag is-danger is-light">超過字數限制</p></div>)

    let on_textarea_change = function(e: React.FormEvent<HTMLTextAreaElement>) {
        let textarea: HTMLTextAreaElement = e.currentTarget;
        let token_size = llamaTokenizer.encode(textarea.value).length;
        
        if (token_size > SETTING.MAX_TOKEN) {
            textarea_info.valid = false;
            textarea.style.color = 'red';
        } else {
            textarea_info.valid = true;
            textarea.style.color = 'black';
        }

        textarea_info.body = e.currentTarget.value;
        textareaStore.set_textarea_dict(textarea_id, textarea_info);
    }

    return (
        <div>
        {error_message_dom}

        <textarea className="textarea" value={textarea_info.body} onChange={on_textarea_change} placeholder="個人資料">
        </textarea>
    </div>
    )
}