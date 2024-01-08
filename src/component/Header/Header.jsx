import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import './header.css';
const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px 20px 5px 20px;
        color: #000;
        text-decoration: none;
        transition: border-bottom 0.3s ease; /* Adding a smooth transition effect */
        border-bottom: 2px solid transparent; /* Initial border style */
    }

`;

const Header = () => {
    const navigate = useNavigate();

    const logout = async () => navigate('/account');
        
    return (
        <Component>
            <Container>
                <Link to='/' className='bar'>HOME</Link>
                <Link to='/about' className='bar'>ABOUT</Link>
                <Link to='/contact' className='bar'>CONTACT</Link>
                <Link to='/account' onClick={logout} className='bar'>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;
