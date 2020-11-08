import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

<<<<<<< HEAD
const PrivateRoute = ({ component, ...args }) => {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        returnTo: `${args.path}/?d=${sessionStorage.getItem('difficulty')}`,
      })}
      {...args}
    />
  );
};

export default PrivateRoute;
=======
const PrivateRoute = ({ component: Component, ...args }) => {
  return <Route render={() => <Component {...args} />} />;
};

export default withAuthenticationRequired(PrivateRoute);
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
