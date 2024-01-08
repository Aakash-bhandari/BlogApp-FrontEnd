import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { API } from '../../service/api';
import { checkCredentials } from '../../utils/common_utils';
 import './login.css'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleComp from './GoogleComp';
////////////////////////////////////////// CSS Work
const Component = styled(Box)`
background-color:transparent;
        width:400px;
        margin:auto;
        box-shadow:5px 2px 5px 2px rgb(0 0 0/0.7)
`;

const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0 0 '
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const Loginbtn = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const Signupbtn = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;
const Error = styled(Typography)`
font-size:10px;
color:#ff6061;
kine-height:0;
margin-top:10px;
font-weight:600
`;

const loginInitialValue = {
    username: "",
    password: ""
}
const signupInitialValue = {
    email: '',
    username: '',
    password: ''
}
///////////////////////////////Toggle of Login and signup

const Login = ({ isuserAuthenticated }) => {

    const [account, toggleAccount] = useState('login')
    const [login, setLogin] = useState(loginInitialValue)
    const [signup, setsignup] = useState(signupInitialValue)
    const [error, seterror] = useState();

    const { setaccount } = useContext(DataContext);
    const navigate = useNavigate();
    const imageurl = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        seterror(false);
    }, [login])

    function toggleSignup() {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }


    const onInputchange = (e) => {
        setsignup({ ...signup, [e.target.name]: e.target.value })
    }

    const SignupUser = async () => {
        ////validate
        const validate = await checkCredentials(signup, true);
        if (validate.isError) {
            toast.error(validate.msg);
            return;
        } else {
            let response = await API.userSignup(signup)
            if (response.isSucces) {
                setsignup(signupInitialValue);
                toast.success("Registered Succesfully..")
                toggleAccount('login')
            } else {
                toast.error(response.msg)
                seterror("Please Try Again Later");
            }
        }
    }

    const onValuechange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }


    const loginuser = async () => {
        ///validation
        const validate = await checkCredentials(login, false);
        if (validate.isError) {
            toast.error(validate.msg);
            return;
        }
        let response = await API.userLogin(login);
        if (response.isSucces) {
            sessionStorage.setItem('accestoken', `Bearer ${response.data.accestoken}`);
            sessionStorage.setItem('refreshtoken', `Bearer ${response.data.refreshtoken}`);
            setaccount({ username: response.data.username, email: response.data.email })
            isuserAuthenticated(true)
            toast.error(response.data.msg);
            navigate('/')
        } else {
            toast.error(response.msg);
        }
    };

    return (
        <div className="containerrrr">
            <Component>
                <Box>
                    <Image src={imageurl} alt="login" />
                    {
                        account === 'login' ?

                            <Wrapper>
                                <TextField variant="standard" onChange={(e) => onValuechange(e)} name="username" label=" username" required />
                                <TextField variant="standard" onChange={(e) => onValuechange(e)} type="password" name="password" label=" Password" required />
                                <Loginbtn variant="contained" onClick={loginuser} >Login</Loginbtn>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <GoogleComp isuserAuthenticated={isuserAuthenticated}/>
                                <Signupbtn variant="outlined" onClick={toggleSignup}>Create an account</Signupbtn>
                                <ToastContainer />
                            </Wrapper>
                            :
                            <Wrapper>
                                <TextField variant="standard" onChange={(e) => onInputchange(e)} name="email" type="email" label=" Email" required />
                                <TextField variant="standard" onChange={(e) => onInputchange(e)} name="username" type="text" label=" Username" required />
                                <TextField variant="standard" onChange={(e) => onInputchange(e)} name="password" type="password" label=" Password" required />
                                <Signupbtn variant="outlined" onClick={SignupUser}>SignUp</Signupbtn>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <GoogleComp isuserAuthenticated={isuserAuthenticated}/>
                                <Loginbtn variant="contained" onClick={toggleSignup} >Already have an Account</Loginbtn>
                                <ToastContainer />
                            </Wrapper>
                    }
                </Box>
            </Component>
        </div>
    )
}
export default Login;