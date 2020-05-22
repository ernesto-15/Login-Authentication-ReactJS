import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import { AuthContext } from './Context/auth';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [isValidated, setIsValidated] = useState(existingTokens);

  const validateToken = async (token) => {
    const resp = await fetch(
      'https://puckllay-back.herokuapp.com/token/validation',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsValidated(resp.ok);
    return resp.ok;
    // validate(resp.ok);
  };

  const setTokens = (data, logout) => {
    const validated = validateToken(data);
    if (validated) {
      if (logout) {
        localStorage.removeItem('tokens');
        setAuthTokens(null);
      } else {
        localStorage.setItem('tokens', JSON.stringify(data));
        setAuthTokens(data);
      }
    }
  };

  useEffect(() => {
    validateToken(authTokens)
  }, [authTokens]);

  return (
    <AuthContext.Provider
      value={{ authTokens, setAuthTokens: setTokens, isValidated }}
    >
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
