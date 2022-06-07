import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled(Link)`
border-radius: 10%;
background-color: white;
color: black;
border: 2px solid #4CAF50;
margin: 0 auto;
padding: 15px 32px;
font-size: 16px;
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
`;

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button onClick={() => loginWithRedirect()}
      to='/form'>
        Entre em sua conta aqui!
      </Button>
    )
  )
}

export default LoginButton