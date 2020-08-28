import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const PrivateRoute = ({ component, ...args }) => {
  const protectedComponent = withAuthenticationRequired(component)(args);
  return (
    <Route render={() => protectedComponent}/>
  );
};

export default PrivateRoute;
