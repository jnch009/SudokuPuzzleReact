import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import './index.css';
import Game from './Components/game';
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
  <Auth0Provider
    domain="jnch009.auth0.com"
    clientId="0Ef0pnv0k533hdciXNUr8w2o4xXHznf8"
    redirectUri={window.location.origin}
  >
    <Game />
  </Auth0Provider>,
  document.getElementById('root')
);