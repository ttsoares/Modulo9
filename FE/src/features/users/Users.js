import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { useDispatch, useSelector } from 'react-redux';
import "./Users.css";
import {Modal, Button } from 'react-bootstrap';
import api from '../../services/api';
//import { all, del, upd, selectUsers, thunkGetUsers } from './usersSlice'
import { all, del, upd, selectUsers } from './usersSlice'
import TableUsers from './table'
import md5 from 'md5'

const Users = () => {

  //const reduxUsers = useSelector(selectUsers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialStateOneUser = {
    name: "",
    password: "",
    uid: ""
  };
  const [ user, setUser ] = useState(initialStateOneUser);
  const [ compUsers, setCompUsers ] = useState([]);
  const [ visible, setVisible ] = useState(false); //Modal

  // Log Out
  function logOut() {
    // TODO what need to be cleaned ?
    navigate('/')
  }

    //--------------------------------- get all users
    async function getAllUsers() {
      const usersList = await api.getUsers()
      setCompUsers(usersList);    // component list of users
      dispatch(all(usersList));  
    }

    //-------------------------------- handle all inputs
  function handleInput(event) {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }
  
  //-------------------------------- call modal to edit user
  async function editUser(uid) {
    const index = compUsers.findIndex( element =>  element.uid === uid) 

    setUser(compUsers[index])
    setVisible(true)
  }
  
  //-------------------------------- save edited user
  async function handleSubmitEdit(event) {
    event.preventDefault();
    setVisible(false);
    const encryptMassword = md5(`${user.name}${user.password}`)
    const newUser = {name: user.name, password: encryptMassword, uid:user.uid}
    console.debug("New User :: ", newUser)

    try {
      await api.updtUser({
        name: user.name,
        password: encryptMassword,
        uid: user.uid
      });
    } catch (error) {
      console.log('error', error);
      throw(error);
    }
  // Update the edited user and just copy all the rest
    setCompUsers(compUsers.map(elm => elm.uid === user.uid ? user : elm))
    dispatch(upd(user));  // Redux list of users
    setUser(initialStateOneUser);
    getAllUsers();
  }

  //-------------------------------- remove user
  async function delUser(uid) {
    try {
      await api.delUser(uid);
      dispatch(del(uid));  // Redux list of users
      getAllUsers();
    } catch (err){
      console.log('error', err);
      throw(err);
    }
  }    

  useEffect(() => {
    getAllUsers();
    //dispatch(thunkGetUsers());
  }, []);

  return (
    <div className='main_users'>
        <div className="container-fluid">
          <header className="header container-fluid d-flex flex-row ">
        <h1 className="me-5 fs-3">Usuários cadastrados:</h1>
        <span className=" fs-4">Administrador</span>
        <button 
          onClick={logOut}
          type="button"
          className="ms-auto btn btn-info btn-outline-success rounded-pill" >
            Log Out
        </button>
          </header>
          {compUsers.length > 0 ? (
            <TableUsers users={compUsers} delUser={delUser} editUser={editUser}/>
            ) : (
              <div className="container-fluid">
                <h1 className="text-center text-info">Sem usuários</h1>
              </div>
            )
          }
        </div>
      {/* Modal for edit user form  */}
      <div>
        <Modal show={visible}  centered size="lg" onHide={() => setVisible(false)} >
          <Modal.Header closeButton >
          <Modal.Title>Editar Usuário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section className="externa">
              <div className="interna">
              <form className="fs-4 fw-bold mt-3" onSubmit={handleSubmitEdit}>
                <label htmlFor="name"><h5><u>Nome</u></h5></label>
                <input
                required
                type="text"
                className="mt-0 form-control-plaintext"
                name="name"
                onChange={handleInput}
                value={user.name}
              />
              <label htmlFor="password"><h5><u>Senha</u></h5></label>
              <input
                required
                type="password"
                className="mt-2 form-control-plaintext"
                name="password"
                onChange={handleInput}
                value={user.password}
              />
              <div className="d-grid mt-3">
              <Button className="rounded-pill" type='submit'>Submeter</Button>
            </div>          
          </form>
        </div>
            </section>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}

export default Users