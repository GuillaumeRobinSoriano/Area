import './Register.css';

import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import AuthService from '../../services/AuthService';


function Register() {

    const history = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
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

    function userNameChanged(event) {
        setErrorMsg(null);
        setName(event.target.value);
    }

    async function handleSubmit(event) {
        try {
            const serverResponse = await AuthService.userRegister(email, password, name);
            if (serverResponse.status === 201) {
                console.log(serverResponse);
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
        <div className='Register-container'>
            <div className='Register-form'>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input onChange={userNameChanged} className="input" type="text" placeholder="Username"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <p className="control has-icons-left has-icons-right">
                        <input onChange={emailChanged} className={`input ${isValidEmail ? 'is-success' : 'is-danger'}`} type="email" placeholder="Email" />
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
                <div className='centering'>
                    <button className="button is-primary" disabled={!isValidEmail || !password.length || !name.length} onClick={handleSubmit}>Register</button>
                </div>
                {errorMsg && <p className='help is-danger'>{errorMsg}</p>}
                <div className='Register-info'>
                    <p>Already have an account ?</p>
                    <a className='ended' href='/login'>Login</a>
                </div>
            </div>
        </div>
    );
}

export default Register;