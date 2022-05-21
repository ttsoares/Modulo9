import React from 'react';
import Login from '../features/login/Login';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
//
import { useState } from 'react';
import { useDispatch, Provider  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { login } from '../features/login/loginSlice';
import md5 from 'md5';
import {Modal, Button } from 'react-bootstrap';
import jwt_decode from "jwt-decode";

it("Component should display 'Nome do Usuário'", () => {
  // destructure all the needed methods
  const { getByText } = render(<Router> <Provider> <Login /> </Provider></Router>);

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const getUserName = getByText("Nome do Usuário")

  expect(getUserName).toBeTruthy();

  //console.log(getUserName.tagName);

  expect(getUserName.tagName).toBe("U");

  expect(getUserName.textContent).toBe("Nome do Usuário");
})

// it("Must show registry link", async () => {
//   const { getByTestId } = render(<Router> <Provider></Provider><Login />, </Router>,);

//   // eslint-disable-next-line testing-library/prefer-screen-queries
//   const regLink = getByTestId("callReg")
//   expect(regLink).toBeTruthy();

// })
