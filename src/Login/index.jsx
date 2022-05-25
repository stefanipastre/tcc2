import React from 'react'
import { Container, FormWrap, Icon, FormContent, Form, FormInput, FormH1, FormLabel, FormButton, Text } from './LoginElements'
import LogoutButton from '../pages/LogoutButton'
import LoginButton from '../pages/LoginButton'

const Login = () => {
  return (
    <>
      <Container>
        <FormWrap>
          <Icon to='/'>SUA SIPAT</Icon>
              <FormH1>Entre na sua conta</FormH1>
              <LoginButton/>
              <LogoutButton/>
        </FormWrap>
      </Container>
    </>
  )
}

export default Login