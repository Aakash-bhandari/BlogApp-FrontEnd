import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';
import { API } from '../../../service/api';
import image from './tick.png'
const Contact = () => {
  const navigate = useNavigate();
  const InitialValues = {
    name: '',
    email: '',
    contact: '',
    message: ''
  }

  const [query, setquery] = useState(InitialValues);

  const onInputchange = (e) => {
    setquery({ ...query, [e.target.name]: e.target.value })
  }

  const Cancel = () => {
    navigate('/')
  }
  const submit = async (e) => {
    e.preventDefault();
    let response = await API.userQuery(query)
    if (response.isSucces) {
      setquery(InitialValues);
      showpopup();
    } else {
      alert("Username Already Exist");
    }
  }


  let popup = document.getElementById('popup');
  let main = document.getElementById('box');
  function showpopup() {
    popup.classList.add("open-popup")
    main.classList.add("background-gayab")
  }

  const Gotohome=()=>{
    navigate('/');
  }

  return (
    <>
      <form action='/contact' onSubmit={submit}>
        <div className="main" id='main'>
          <div class="background" id='box'>
            <div class="containerr">
              <div class="screen">
                <div class="screen-header">
                  <div class="screen-header-left">
                    <div class="screen-header-button close"></div>
                    <div class="screen-header-button maximize"></div>
                    <div class="screen-header-button minimize"></div>
                  </div>
                  <div class="screen-header-right">
                    <div class="screen-header-ellipsis"></div>
                    <div class="screen-header-ellipsis"></div>
                    <div class="screen-header-ellipsis"></div>
                  </div>
                </div>
                <div class="screen-body">
                  <div class="screen-body-item left">
                    <div class="app-title">
                      <span>CONTACT</span>
                      <span>US</span>
                    </div>
                    <div class="app-contact">CONTACT INFO : +91 9653219124</div>
                  </div>
                  <div class="screen-body-item">
                    <div class="app-form">
                      <div class="app-form-group">
                        <input class="app-form-control" placeholder="NAME" onChange={(e) => onInputchange(e)} name='name' />
                      </div>
                      <div class="app-form-group">
                        <input class="app-form-control" placeholder="EMAIL" onChange={(e) => onInputchange(e)} name='email' />
                      </div>
                      <div class="app-form-group">
                        <input class="app-form-control" placeholder="CONTACT NO" onChange={(e) => onInputchange(e)} name='contact' />
                      </div>
                      <div class="app-form-group message">
                        <input class="app-form-control" placeholder="MESSAGE" onChange={(e) => onInputchange(e)} name='message' />
                      </div>
                      <div class="app-form-group buttons">
                        <button class="app-form-button" onClick={Cancel}>CANCEL</button>
                        <button class="app-form-button" type='submit'>SEND</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div class="credits">
                
                <a class="credits-link" href="https://dribbble.com/shots/2666271-Contact" target="_blank">
                  <svg class="dribbble" viewBox="0 0 200 200">
                    <g stroke="#ffffff" fill="none">
                      <circle cx="100" cy="100" r="90" stroke-width="20"></circle>
                      <path d="M62.737004,13.7923523 C105.08055,51.0454853 135.018754,126.906957 141.768278,182.963345" stroke-width="20"></path>
                      <path d="M10.3787186,87.7261455 C41.7092324,90.9577894 125.850356,86.5317271 163.474536,38.7920951" stroke-width="20"></path>
                      <path d="M41.3611549,163.928627 C62.9207607,117.659048 137.020642,86.7137169 189.041451,107.858103" stroke-width="20"></path>
                    </g>
                  </svg>
                  
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </form>

      <div className="popup" id='popup'>
        {/* <img src='tick.png' alt="image"/> */}
        <img src={image} alt="" srcset="" />
        <h2>Thank You !</h2>
        <p>Our Team Will Contact You Shortly !</p>
        <button type='button' onClick={Gotohome}>OK</button>
      </div>
    </>
  )
}

export default Contact;