import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Game from './Components/game';

import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth0-provider-with-history';
import PromptProvider from './providers/PromptProvider/index';
import SudokuPrompt from './Components/SudokuPrompt/SudokuPrompt';

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <PromptProvider>
        <Game />
        <SudokuPrompt />
      </PromptProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
