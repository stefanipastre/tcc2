import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { Auth0Provider } from '@auth0/auth0-react'

Amplify.configure(awsconfig);

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
  domain={domain}
  clientId={clientId}
  redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);


export default App;
