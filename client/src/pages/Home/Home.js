import './Home.css';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ActionService from '../../services/ActionService';
import { Action } from 'history';

function Home() {

    const history = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [themes, setThemes] = useState([]);
    const [allActReacts, setAllActReacts] = useState(JSON.parse(localStorage.getItem('AllActReacts')));
    const [allAssets, setAllAssets] = useState([]);

    async function fetchActions() {
        try {
            const serverResponse = await ActionService.getAllActions(token);
            if (serverResponse.status == 200) {
                localStorage.setItem('AllActions', JSON.stringify(serverResponse.data));
                const tempThemes = [];
                for (let i = 0; i < serverResponse.data.length; i += 1) {
                    const themeName = serverResponse.data[i].name.split(' ')[0];
                    if (tempThemes.includes(themeName)) {
                        continue;
                    }
                    tempThemes.push(themeName);
                }
                setThemes(tempThemes);
            } else {
                console.log(serverResponse);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function fetchReactions() {
        try {
            const serverResponse = await ActionService.getAllReactions(token);
            if (serverResponse.status == 200) {
                localStorage.setItem('AllReactions', JSON.stringify(serverResponse.data));
            } else {
                console.log(serverResponse);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function getAllActReacts() {
        try {
            const serverResponse = await ActionService.getAllActReact(token);
            if (serverResponse.status == 200) {
                localStorage.setItem('AllActReacts', JSON.stringify(serverResponse.data));
                setAllActReacts(serverResponse.data);
                let allActions = JSON.parse(localStorage.getItem('AllActions'));
                const tempAssets = serverResponse.data.map(e => allActions.find(action => action.name === e.action).assets);
                setAllAssets(tempAssets);
            } else {
                console.log(serverResponse);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (token === null || token === undefined) {
            history('/login');
        } else {
            fetchActions();
            fetchReactions();
            getAllActReacts();
        }
    }, [token]);

    function randomColor() {
        const colors = ['is-primary', 'is-warning', 'is-info', 'is-danger', 'is-success', 'is-dark'];
        const rand = Math.floor(Math.random() * colors.length);
        return colors[rand];
    }

    async function handleDelete(action) {
        try {
            const serverResponse = await ActionService.deleteActReact(token, action.id);
            if (serverResponse.status === 200) {
                const temp = [...allActReacts];
                const index = temp.indexOf(action);
                temp.splice(index, 1);
                const assetsTemp = [...allAssets];
                assetsTemp.splice(index, 1);
                setAllActReacts(temp);
                setAllAssets(assetsTemp);
                localStorage.setItem('AllActReacts', JSON.stringify(temp));
            } else {
                alert('Failed to delete action');
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                        <span>Add Action</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                    <div className="dropdown-content">
                        {themes.map((theme, index) => {
                            return (
                                <a key={index} className="dropdown-item" href={`/custom/${theme}`}>
                                    {theme}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile">
                        {
                            allActReacts === null || allActReacts === undefined || allActReacts.length === 0 ? null :
                                allActReacts.map((actReact, index) => {
                                    return (
                                        <div key={index} className="tile is-parent margined">
                                            <article className={`tile is-child notification ${randomColor()}`}>
                                                <span onClick={() => handleDelete(actReact)} className="icon is-pulled-right">
                                                    <i className="fas fa-trash"></i>
                                                </span>
                                                <p className="title">{actReact.action}</p>
                                                <figure className="image is-4by3">
                                                    <img src={allAssets[index]} />
                                                </figure>
                                                <p>Reaction: {actReact.reaction}</p>
                                                <p>Param: {actReact.param} </p>
                                            </article>
                                        </div>
                                    );
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;