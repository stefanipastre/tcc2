import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import FormPage from './form';
import { Link } from 'react-router-dom';

const Button = styled.button`
border-radius: 10%;
background-color: white;
color: black;
border: 2px solid #4CAF50;
margin: 0 auto;
padding: 15px 32px;
font-size: 16px;
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
`;

export const Icon = styled(Link)`
border-radius: 10%;
background-color: white;
color: black;
border: 2px solid #4CAF50;
margin: 0 auto;
padding: 15px 32px;
font-size: 16px;
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
text-decoration:none;
`;

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
    <>
      <Button onClick={() => logout()}>
        Sair
      </Button>
    </>
    )
  )
}

export default LogoutButton