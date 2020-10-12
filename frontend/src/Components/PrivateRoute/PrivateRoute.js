import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const PrivateRoute = ({ component: Component, ...args }) => {
  return <Route render={() => <Component />} {...args} />;
};

export default withAuthenticationRequired(PrivateRoute);
