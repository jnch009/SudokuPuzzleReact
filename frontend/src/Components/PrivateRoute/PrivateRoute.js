import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const PrivateRoute = ({ component, ...args }) => {
  return <Route component={withAuthenticationRequired(component)} {...args} />;
};

export default PrivateRoute;
