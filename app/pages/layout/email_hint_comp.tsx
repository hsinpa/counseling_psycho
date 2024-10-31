import { useRef, useState } from 'react';
import simulation_img from '../../assets/UI/interrogation-mark.png';
import './email_hint.scss'


export const Email_Hint_Comp = function() {
    let copy_tag_ref = useRef<HTMLButtonElement | null>(null);
    const [modal_visibility, set_visibility] = useState(false);
    const [is_copy, set_copy] = useState(false);
    const email = 'exiled1146@gmail.com';
    let modal_classname = 'modal';

    if (copy_tag_ref.current != null) {
        copy_tag_ref.current.style.textDecorationLine = (is_copy) ? 'line-through' : 'none';
    }

    if (modal_visibility) modal_classname += ' is-active';

    return (

        <div>
        <div className={modal_classname}>
            <div className="modal-background" onClick={() => {set_visibility(false)}}></div>
            <div className="modal-content">

                <div className='email_hint_modal'>
                <article className="message is-info">
                    <div className="message-body">
                        回報問題, 請傳送Email 到以下地址 <strong>{email}</strong>  <button onClick={() => {
                            set_copy(true);
                            navigator.clipboard.writeText(email);
                            }
                        } ref={copy_tag_ref} className='tag is-dark'>點我複製</button>                     
                    </div>
                    </article>
                </div>
            </div>
            <button className="modal-close is-large"  aria-label="close" onClick={() => {set_visibility(false)}}></button>
        </div>

        <div className="email_hint_comp">
            <img src={simulation_img} title='問題回報' onClick={() => {set_visibility(true); set_copy(false); }}></img>
        </div>
        </div>
    )
}