import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import './index.css';
<<<<<<< HEAD
=======
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
import Game from './Components/game';

import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth0-provider-with-history';
<<<<<<< HEAD
=======
import PromptProvider from './providers/PromptProvider/index';
import SudokuPrompt from './Components/SudokuPrompt/SudokuPrompt';
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
<<<<<<< HEAD
      <Game />
=======
      <PromptProvider>
        <Game />
        <SudokuPrompt />
      </PromptProvider>
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);
<<<<<<< HEAD
=======

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
