import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.replace(appState?.returnTo || window.location.pathname);
<<<<<<< HEAD
    history.go(0);
=======
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
<<<<<<< HEAD
=======
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope={process.env.REACT_APP_AUTH0_SCOPE}
      useRefreshTokens={true}
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
