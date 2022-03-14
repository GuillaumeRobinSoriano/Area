import './Login.css';

import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import AuthService from '../../services/AuthService';

function Login() {

    const history = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('token') || isLoggedIn) {
            setIsLoggedIn(true);
            history('/');
        }
    }, [isLoggedIn]);

    function emailChanged(event) {
        setErrorMsg(null);
        setEmail(event.target.value);
        setIsValidEmail(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(event.target.value));
    }

    function passwordChanged(event) {
        setErrorMsg(null);
        setPassword(event.target.value);
    }

    async function responseGoogle(respone) {
        try {
            const triedLogin = await AuthService.userLogin(respone.profileObj.email, 'google');
            if (triedLogin.status == 201) {
                localStorage.setItem('token', triedLogin.data);
                setIsLoggedIn(true);
                history('/');
                return;
            }
        } catch (e) {
            try {
                const serverResponse = await AuthService.userRegister(respone.profileObj.email, 'google', respone.profileObj.givenName);
                if (serverResponse.status === 201) {
                    localStorage.setItem('token', serverResponse.data);
                    setIsLoggedIn(true);
                } else {
                    console.log(serverResponse);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    async function handleSubmit(event) {
        try {
            const serverResponse = await AuthService.userLogin(email, password);
            if (serverResponse.status === 201) {
                localStorage.setItem('token', serverResponse.data);
                setIsLoggedIn(true);
            } else {
                console.log(serverResponse);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='Login-container'>
            <div className='Login-form'>
                <div className="field">
                    <label className="label">Email</label>
                    <p className="control has-icons-left has-icons-right">
                        <input onChange={emailChanged} className={`input ${isValidEmail ? 'is-success' : 'is-danger'}`} type="email" placeholder="Email"/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                    </p>
                    <p className={`help ${isValidEmail ? 'is-success' : 'is-danger'}`}>This email is {isValidEmail ? 'valid' : 'invalid'}</p>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <p className="control has-icons-left">
                        <input onChange={passwordChanged} className="input" type="password" placeholder="Password" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                    </p>
                </div>
                <div className="centering">
                    <button className="button is-primary" disabled={!isValidEmail || !password.length} onClick={handleSubmit}>Login</button>
                </div>
                {errorMsg && <p className='help is-danger'>{errorMsg}</p>}
                <h2 className='Login-bottom' />
                <span className='Login-bottom-text' >or connect with</span>
                <div className='Google-button'>
                    <GoogleLogin
                            clientId="845274559273-cdvqr9sbjqia2rt2ooc19madon05k5lu.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />
                </div>
                <div className='Login-info'>
                    <p>New here ?</p>
                    <a className='ended' href='/register'>Register</a>
                </div>
            </div>
        </div>
    );
}

export default Login;