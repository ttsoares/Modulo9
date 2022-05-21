/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { login } from './loginSlice';
import md5 from 'md5';
import {Modal, Button } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import loading from '../imgs/loading.jpg';

import "./index.css";

const Login = (props) => {

  console.clear();
  localStorage.clear();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    password: ""
  };
  const [user, setUser] = useState(initialState);
  const [error, setError] = useState(false);
  const [clock, setClock] = useState(false);

  //--------------------------------
  function handleInput(event) {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  //--------------------------------
  async function handleSubmit(event) {
    event.preventDefault();

    // Create admin hash
    const password = md5(`${user.name}${user.password}`)

    if (user.name === 'admin' && password === 'f14cf4eca31dac45702e5b4a24975337') {
      let replyToken
      // Send to BE 'admin'  and the entered password  
      try {
        setClock(true);
        replyToken = await api.testAdmin('admin', user.password) 
        setClock(false);
      } catch (error) {
        console.log('Ocorreu algum erro', error)
      }
      const { token: tokenAdmin } = replyToken

      if (!tokenAdmin) {
        // BE did not approve the authentication
        setError(true)
        return
      }

      localStorage.setItem('ADM', tokenAdmin);
      // Reply to App with 'admin' to open the route
      props.respLogin('admin')
      navigate('Users')
    return
    }

    // Test user credentials
    let responseBE
    const cryptPassword = md5(`${user.name}${user.password}`)
    try {
      setClock(true);
      responseBE = await api.login({
        name: user.name,
        password: cryptPassword
      });
      setClock(false);
    } catch (error) {
      console.log('Ocorreu algum erro', error)
    }

    const { token } = responseBE
    localStorage.setItem('token', token);
    const {id, name } = jwt_decode(token);

    if (id) {
      dispatch(login({
        name, id
      }));
      props.respLogin('user') // to App decide the route to use
      navigate('Messages', { state: {uid: id, name: name}})

      return
    }

    // No user, no admin : erro message
    setError(true)

    console.log("Acesso negado.")
    return
  }

  return (
    <div className='main_login'>
    <header className="d-flex justify-content-center">
      <h1>Log In</h1>
    </header>

    <section className="externa">
      <div className="internaLogin">
        <form className="mt-3" onSubmit={handleSubmit}>
          <label htmlFor="userName"><h5><u>Nome do Usuário</u></h5></label>
          <input
            required
            type="text"
            className="mt-0 form-control-plaintext"
            placeholder="Enter user name"
            id="userName"
            name="name"
            onChange={handleInput}
            value={user.name}
          />
          <label htmlFor="passWord"><h5><u>Senha</u></h5></label>
          <input
            type="password"
            className="mt-2 form-control-plaintext"
            placeholder="Enter password"
            id="passWord"
            name="password"
            onChange={handleInput}
            value={user.password}
          />

          <div className="d-grid mt-3">
            <button
              disabled={!user.name || !user.password}
              id="myBtn"
              className="btn btn-primary rounded-pill"
              typeof='submit'
            >
            Entrar
            </button>
          </div>
        </form>

        <footer data-testid="callReg">
          <div className="px-0 mt-2 container d-flex">
            <p className="pe-2 text-secondary">Não tem uma conta ?</p>
            <a className='registre' onClick={() => {navigate('Signin')}}>Registre-se</a>
          </div>
        </footer>
      </div>
    {clock ? 
        <div class="position-absolute"> 
        <img class="clock" src={loading} alt="Loading"/></div>: null
      }
    </section>

{/* ---------------------------------------------------------------------- */}

    <Modal show={error}  centered size="lg" onHide={() => setError(false)} >
        <Modal.Header closeButton >
          <Modal.Title>Ocorreu algum erro !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="externa">
            <div className="interna">
              <form className="fs-4 fw-bold mt-3" onSubmit={() => setError(false)}>
                <div className="d-grid mt-3">
                <Button className="rounded-pill" type='submit'>Temtar novamente ?</Button>
                </div>
              </form>
            </div>
          </section>
        </Modal.Body>
      </Modal>
  </div>
  )
}
export default Login;