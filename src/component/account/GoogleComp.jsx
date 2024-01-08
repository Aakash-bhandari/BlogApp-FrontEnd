import { GoogleOAuthProvider } from '@react-oauth/google';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const Signupbtn = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const GoogleComp = ({ isuserAuthenticated }) => {
    const { setaccount } = useContext(DataContext);
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        username: "",
        email: ""
    })
    const Google_Authenticate = async () => {
        let response = await API.Login_through_Google(login);
        if (response.isSucces) {
            sessionStorage.setItem('accestoken', `Bearer ${response.data.accestoken}`);
            sessionStorage.setItem('refreshtoken', `Bearer ${response.data.refreshtoken}`);
            setaccount({ username: response.data.username, email: response.data.email })
            isuserAuthenticated(true)
            navigate('/')
        } else {
            //toast.error("Some Error Occured..");
            toast.error(response.data.msg);
            return;
        }
    }

    return (
        <GoogleOAuthProvider clientId="124507221701-8dlfnuujmfal93as78h9on9cm06kvd44.apps.googleusercontent.com">
            <Signupbtn>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        var token = jwtDecode(credentialResponse.credential)
                        setLogin({
                            ...login,  // Spread the existing state to keep other properties
                            username: token.given_name,
                            email: token.email
                        });
                        Google_Authenticate();
                    }}
                    onError={() => {
                        toast.error("Some Error Occured..")
                    }}
                />
            </Signupbtn>
            {/* <ToastContainer/> */}
        </GoogleOAuthProvider>
    )
}
export default GoogleComp;

