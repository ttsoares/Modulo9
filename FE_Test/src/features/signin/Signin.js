import React,{useState} from 'react';
import {Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import api from '../../services/api';
import md5 from 'md5';
import loading from '../imgs/loading.jpg';

//===========================================
function Signin() {
  const [visible, setVisible] = useState(true);
  const [visSuccess, setvisSuccess] = useState(false);
  const [visErrPass, setvisErrPass] = useState(false);
  const [visErrLett, setvisErrLett] = useState(false);
  const [clock, setClock] = useState(false);

  const navigate = useNavigate();

  const initialState = {
    name: "",
    password1: "",
    password2: ""
  }
  const [user, setUser] = useState(initialState)

  //-------------------------------------------
  const backLogin = () => {
    navigate('/')
  }  

  //-------------------------------------------
  const resetPage = () => {
    window.location.reload(false);
  }

  //-------------------------------------------
  function handleInput(event) {
    const { name, value } = event.target
    setUser({ ...user, [name]: value.replace(/\s/g, "")})
  }

  //-------------------------------------------
  async function handleSubmit(event) {
    event.preventDefault();

    // Different passwords
    if(user.password1 !== user.password2){
      setVisible(false)
      setvisErrPass(true)
      return
    }

    // Test if all username letters are between 'a' and 'z'
    const letters = /^[A-Za-z]+$/;
    if(!user.name.match(letters))
    {
      console.log('erro')
      setVisible(false)
      setvisErrLett(true)
      return
    }

    const encryPassword = md5(`${user.name}${user.password1}`)

    try {
      setClock(true);
      await api.addUser(user.name, encryPassword);
      setClock(false);
      setVisible(false)
      setvisSuccess(true)
    } catch (error){
      console.log('error', error)
      throw(error)
    }
  }

  return (
    <div className='main_signin bg-altdark'>
      {/* Main Modal with the input form */}
      <Modal show={visible} onHide={backLogin}>
        <Modal.Header >
          <Modal.Title >Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="externa">
            <div className="interna">
              <form className="mt-3" onSubmit={handleSubmit}>
                <label htmlFor="userName"><h5><u>Nome do Usuário</u></h5></label>
                <input
                  required
                  type="text"
                  className="mt-0 form-control-plaintext"
                  placeholder="Enter user name"
                  name="name"
                  onChange={handleInput}
                  value={user.name}
                />
                <label htmlFor="passWord"><h5><u>Senha</u></h5></label>
                <input
                  type="password"
                  className="mt-2 form-control-plaintext"
                  placeholder="Enter password"
                  name="password1"
                  onChange={handleInput}
                  value={user.password1}
                />
                <label htmlFor="passWord"><h5><u>Confirme a Senha</u></h5></label>
                <input
                  type="password"
                  className="mt-2 form-control-plaintext"
                  placeholder="Enter password"
                  name="password2"
                  onChange={handleInput}
                  value={user.password2}
                />
                <div className="d-grid mt-3">
                  <button
                    disabled={!user.name || !user.password1 
                      || user.password1 !== user.password2}
                    id="myBtn"
                    className="btn btn-primary rounded-pill"
                    typeof='submit'
                  >
                    Submeter
                  </button>
                </div>          
              </form>
            </div>
            {clock ? 
              <div class="align-bottom"> 
              <img class="clock" src={loading} alt="Loading"/></div>: null
            }
          </section>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={backLogin}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* --------------MODAL success */}
      <Modal show={visSuccess} >
        <Modal.Header>
          <Modal.Title>Sucesso !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>O usuário foi criado.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={backLogin}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* --------------MODAL error letters */}
      <Modal show={visErrLett}>
        <Modal.Header>
          <Modal.Title>Nome de usuário inválido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Somente letras de 'a' até 'Z'.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{resetPage()}}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

        {/* --------------MODAL error passwords */}
        <Modal show={visErrPass}>
        <Modal.Header>
          <Modal.Title>Senhas Diferentes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>As duas senhas devem ser iguais.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{resetPage()}}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Signin;