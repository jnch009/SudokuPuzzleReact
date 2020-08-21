import React from 'react';
import { Button } from 'shards-react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()} className='navBar'>Log In</Button>;
};

export default LoginButton;