import './Custom.css';

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ActionService from '../../services/ActionService';
import ActionForm from '../../Component/ActionForm';

function Custom() {

    const history = useNavigate();
    const { theme } = useParams();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [possibleActions, setPossibleActions] = useState([]);
    const [AllActions, setAllActions] = useState(JSON.parse(localStorage.getItem('AllActions')));
    const [AllReactions, setAllReactions] = useState(JSON.parse(localStorage.getItem('AllReactions')));
    const [AllStates, setAllStates] = useState([]);
    const [selectedAction, setSelectedAction] = useState(null);
    const [actOrReact, setActOrReact] = useState('action');
    const [actionData, setActionData] = useState([]);
    const [reactionData, setReactionData] = useState([]);
    const [isValidForm, setIsValidForm] = useState(false);
    const [actionErrorMsgs, setActionErrorMsgs] = useState([]);
    const [reactionErrorMsgs, setReactionErrorMsgs] = useState([]);
    const [trigger, setTrigger] = useState('>');
    const [selectedReactionIndex, setSelectedReactionIndex] = useState(0);

    async function fetchActions() {
        try {
            const serverResponse = await ActionService.getAllActions(token);
            if (serverResponse.status == 200) {
                localStorage.setItem('AllActions', JSON.stringify(serverResponse.data));
                setAllActions(serverResponse.data);
            } else {
                console.log(serverResponse);
            }
        } catch (e) {
            console.log(e);
        }
    }

    function parseActions() {
        setPossibleActions(AllActions.filter(action => action.name.includes(theme)));
        setAllStates(possibleActions.map(action => false));
    }

    useEffect(() => {
        if (token === null || token === undefined) {
            history('/login');
        }
        if (AllActions === null || AllActions === undefined || AllActions.length === 0) {
            fetchActions();
        } else {
            parseActions();
        }
    }, [AllActions]);

    function updateState(index) {
        if (index < 0 || index >= possibleActions.length) {
            return;
        }
        console.log(index);
        const temp = [...AllStates];
        temp[index] = !temp[index];
        setAllStates(temp);
    }

    function updateSelectedAction(index) {
        setSelectedAction(possibleActions[index]);
        setActionData(possibleActions[index].req.map(e => ''));
        setReactionData(AllReactions[selectedReactionIndex].req.map(e => ''));
        setIsValidForm(false);
        setActionErrorMsgs(possibleActions[index].req.map(e => null));
        setReactionErrorMsgs(AllReactions[selectedReactionIndex].req.map(e => null));
    }

    function reset() {
        setSelectedAction(null);
        setActionData([]);
        setReactionData([]);
        setIsValidForm(false);
        setActionErrorMsgs([]);
        setReactionErrorMsgs([]);
    }

    function pullActionSettings(data) {
        setActionData(data);
    }

    function pullReactionSettings(data) {
        setReactionData(data);
    }

    function whichIsActive(name) {
        return name === actOrReact ? "is-active" : "";
    }

    async function handleSubmit() {
        try {
            const serverResponse = await ActionService.setActReact(token, selectedAction.name, AllReactions[selectedReactionIndex].name, actionData, reactionData, trigger);
            if (serverResponse.status === 201) {
                alert('Action created successfully');
                reset();
            } else {
                alert('Action failed to create');
            }
        } catch (e) {
            console.log(e);
        }
    }

    function pullActionErorrs(errors) {
        setActionErrorMsgs(errors);
        for (let i = 0; i < reactionErrorMsgs.length; i++) {
            if (reactionErrorMsgs[i] !== null) {
                setIsValidForm(false);
                return;
            }
        }
        for (let i = 0; i < errors.length; i++) {
            if (errors[i] !== null) {
                setIsValidForm(false);
                return;
            }
        }
        setIsValidForm(checkForEmptyDatas());
    }

    function pullReactionErorrs(errors) {
        setReactionErrorMsgs(errors);
        for (let i = 0; i < actionErrorMsgs.length; i++) {
            if (actionErrorMsgs[i] !== null) {
                setIsValidForm(false);
                return;
            }
        }
        for (let i = 0; i < errors.length; i++) {
            if (errors[i] !== null) {
                setIsValidForm(false);
                return;
            }
        }
        setIsValidForm(checkForEmptyDatas());
    }

    function checkForEmptyDatas() {
        return actionData.every(e => e !== '') && reactionData.every(e => e !== '');
    }

    function pullTriggerState(trigger) {
        setTrigger(trigger);
    }

    function switchReactionIndex() {
        setSelectedReactionIndex(selectedReactionIndex === 0 ? 1 : 0);
    }

    return (
        <div className='container'>
            {possibleActions.map((action, index) => {
                return (
                    <div key={index} className="card">
                        <header className="card-header">
                            <p className="card-header-title">
                                {action.name}
                            </p>
                            <button onClick={() => updateState(index)} className="card-header-icon" aria-label="more options">
                                <span className="icon">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </header>
                        {AllStates[index] ? <div><div className="card-content">
                            <div className="content">
                                {action.description}
                            </div>
                        </div>
                            <footer className="card-footer">
                                <button onClick={() => updateSelectedAction(index)} className="card-footer-item">Select</button>
                            </footer>
                        </div> : null}</div>
                );
            })}
            {selectedAction !== null ?
            <div>
                <div className="tabs is-centered">
                    <ul>
                        <li className={whichIsActive('action')} onClick={() => setActOrReact('action')}><a>Action</a></li>
                        <li className={whichIsActive('reaction')} onClick={() => setActOrReact('reaction')}><a>Reaction</a></li>
                    </ul>
                </div>
                {actOrReact === 'action' ? 
                <>
                    <ActionForm trigger={pullTriggerState} action={selectedAction} funcError={pullActionErorrs} funcData={pullActionSettings} type='action' data={actionData} errorMsgs={actionErrorMsgs}/>
                </>
                :<>
                    <ActionForm switch={switchReactionIndex} trigger={pullTriggerState} action={AllReactions[selectedReactionIndex]} funcError={pullReactionErorrs} funcData={pullReactionSettings} type='reaction' data={reactionData} errorMsgs={reactionErrorMsgs}/>
                </>
                }
                <div className="centering">
                    <button className="button is-primary" onClick={handleSubmit} disabled={!isValidForm} >Validate</button>
                </div>
            </div> : null}
        </div>
    );
}

export default Custom;