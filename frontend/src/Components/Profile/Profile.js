import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'jnch009.auth0.com';

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
        });

        console.log(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently]);

  return (
    isAuthenticated && (
      <div>
        <h1>{user.sub}</h1>
        {/* <img src={user.picture} alt={user.name} /> */}
        {/* <h2>{user.name}</h2> */}
        {/* <p>{user.email}</p> */}
      </div>
    )
  );
};

export default Profile;
