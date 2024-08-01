import { Fragment, useContext, useEffect, useState } from "react";
import { Basic_Docs_Template, SocketEvent } from "~/utility/api_static";
import { generate_document } from "~/utility/docs_exporter.client";
import { MixTheoryResp } from "../questionnaires/questionnaire_type";
import { wsContext } from "~/root";

const MixContent = function({theory}: {theory: MixTheoryResp }) {
    if (theory == null || theory.content == null)
        return (<Fragment></Fragment>);
    const [docs_url, set_docs_url] = useState('');

    useEffect(() => {
        set_docs_url(window.location.origin + Basic_Docs_Template);
    }, []);

    const on_export_btn = function() {
        generate_document(docs_url, '融合理論分析報告', theory.content);
    }

return (
    <div className="content">
        <h1>融合理論分析: {
            theory.theory_name.reduce((myString, values, myArr) => {
                if (myArr === 0) {
                return `${values}`;
                } else {
                return `${myString}, ${values}`;
                }
            }, '')}</h1>
        <button className="button" onClick={on_export_btn}>匯出檔案</button>
        <pre>{theory.content}</pre>
    </div>
)
}

const StreamingContent = function() {
    const [docs_url, set_docs_url] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const socket = useContext(wsContext);

    const on_socket_callback = function(socket_data: any) {
        console.log(socket_data);
    }

    useEffect(() => {
        socket?.ListenToEvent(SocketEvent.bot, on_socket_callback);
        set_docs_url(window.location.origin + Basic_Docs_Template);
    }, []);

    const on_export_btn = function() {
        generate_document(docs_url, '個案分析報告 - ', content);
    }

    return (
    <div className="content">
        <button className="button" onClick={on_export_btn}>匯出檔案</button>
        <pre>{content}</pre>
    </div>
)
}

export const MixTheoryReportView = function({mix_thoery}: {mix_thoery: MixTheoryResp}) {

    return (<div className="container multi_theory_report">
        <StreamingContent></StreamingContent>
    </div>)
}