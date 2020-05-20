import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Context/auth';

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();
  // const [isValidated, setIsValidated] = useState(false)

  // useEffect(() => {
  //   console.log('object');
  //   fetch(
  //     'https://puckllay-back.herokuapp.com/token/validation',
  //     {
  //       method: 'POST',
  //       mode: 'cors',
  //       headers: {
  //         'Authorization': `Bearer ${authTokens}`,
  //       },
  //     }
  //   ).then(resp => setIsValidated(resp.ok));
  // }, [])
  // console.log(isValidated);
  return (
    <Route
      {...rest}
      render={(props) => {
        return authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { referer: props.location } }}
          />
        )
      }
      }
    />
  );
}

export default PrivateRoute;
