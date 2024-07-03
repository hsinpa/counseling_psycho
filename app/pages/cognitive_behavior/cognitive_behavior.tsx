import { RenderShortTheoryForm } from '../questionnaires/object_relation_theory_comp';
import '../questionnaires/questionarie.scss'


export let CognitiveBehaviorView = function() {

    return (<div className="container">
        <RenderShortTheoryForm title={'理論二 認知行為療法'}></RenderShortTheoryForm>
    </div>);
}