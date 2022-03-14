import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Custom from './pages/Custom/Custom';
import Mobile from './pages/Mobile/Mobile';

import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  return (
    <div className="App">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
          </a>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href='/'>
              Home
            </a>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {token === null || token === undefined ?
                <div className="buttons">
                  <a className="button is-primary" href='/register'>
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light" href='/login'>
                    Log in
                  </a> </div> : <div className="buttons"> <a href="/client.apk" className="button is-light"> Mobile</a> </div>}
            </div>
          </div>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/custom/:theme" element={<Custom />} />
          <Route path="/client.apk" element={<Mobile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;