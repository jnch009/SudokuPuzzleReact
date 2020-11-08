import React from 'react';
import { Button } from 'shards-react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
<<<<<<< HEAD
    <Button
      onClick={() => logout({ returnTo: window.location.origin })}
      className='navBar'
    >
=======
    <Button onClick={() => logout({ returnTo: window.location.origin })} className='navBar'>
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
      Log Out
    </Button>
  );
};

export default LogoutButton;
