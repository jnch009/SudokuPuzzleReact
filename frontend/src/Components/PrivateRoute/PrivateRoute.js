import React from 'react';
import { Route,useHistory } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const PrivateRoute = ({ component, ...args }) => {
  const history = useHistory();
  history.replace('/');
  return <Route component={withAuthenticationRequired(component)} {...args} />;
};

export default PrivateRoute;
