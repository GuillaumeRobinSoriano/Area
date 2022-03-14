import './ActionForm.css';

import {useEffect, useState} from 'react';

function ActionForm(props) {

    const signs = ['>', '<', '='];
    const [selectedSign, setSelectedSign] = useState(signs[0]);

    function updateSign(i) {
        setSelectedSign(signs[i]);
        props.trigger(signs[i]);
    }

    function onChange(event, i) {
        const type = Object.values(props.action.req[i])[0];
        let errorMsg = null;
        if (type == 'int' && !/^[0-9]+$/.test(event.target.value)) {
            errorMsg = 'Please enter a valid number';
        } else if (type == 'String' && !/^.+$/.test(event.target.value)) {
            errorMsg = 'Please enter a valid string';
        }
        const copyData = [...props.data];
        copyData[i] = event.target.value;
        props.funcData(copyData);
        const copyError = [...props.errorMsgs];
        copyError[i] = errorMsg;
        props.funcError(copyError);
    }

    return (
        <div className="tile">
            <div className="tile is-parent">
                <article className={`tile is-child notification ${props.type === 'action' ? 'is-info' : 'is-danger'}`}>
                    {props.type === 'reaction' && <span onClick={() => props.switch()} className="icon is-pulled-right">
                        <i className="fas fa-reply"></i>
                    </span>}
                    <p className="title">{props.action.name}</p>
                    <p className="subtitle">Make your choices</p>
                    <div className="content">
                        {props.action.req.map((req, index) => {
                            return (
                                <div key={index}>
                                    {Object.values(req)[0] == "int" && <div className="dropdown is-hoverable sign">
                                        <div className="dropdown-trigger">
                                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                                                <span>{selectedSign}</span>
                                                <span className="icon is-small">
                                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                            <div className="dropdown-content">
                                                {signs.map((sign, i) => {
                                                    return (
                                                        <a onClick={() => updateSign(i)} key={i} className="dropdown-item">
                                                            {sign}
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>}
                                    <div className="control">
                                        <input id={index} value={props.data[index]} className="input is-hovered" type="text" placeholder={Object.keys(req)[0]} onChange={(e) => onChange(e, index)} />
                                    </div>
                                    {props.errorMsgs[index] && <p className="help is-danger">{props.errorMsgs[index]}</p>}
                                </div>
                            );
                        })}
                    </div>
                </article>
            </div>
        </div>
    );
}

export default ActionForm;