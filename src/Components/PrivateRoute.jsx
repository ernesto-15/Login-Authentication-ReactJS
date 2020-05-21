import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Context/auth';

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens, validate, isValidated } = useAuth();
  // const [isValidated, setIsValidated] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      const resp = await fetch(
        'https://puckllay-back.herokuapp.com/token/validation',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
        }
      );
      validate(resp.ok);
    };
    validateToken();
    // console.log(isValidated);
  }, [authTokens, validate]);
  return (
    <Route
      {...rest}
      render={(props) => {
        return isValidated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { referer: props.location } }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
