import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Context/auth';

function PrivateRoute({ component: Component, ...rest }) {
  const { isValidated } = useAuth();
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
