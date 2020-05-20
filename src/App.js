import React, { useState } from 'react';
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
  // const [isValidated, setIsValidated] = useState(false);
  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };
  // useEffect(() => {
  //   console.log('object');
  //   const fetchData = async () => {
  //     const resp = await fetch('https://puckllay-back.herokuapp.com/token/validation', {
  //       method: 'POST',
  //       mode: 'cors',
  //       headers: {
  //         Authorization: `Bearer ${authTokens}`,
  //       },
  //     })
  //     setIsValidated(resp.ok)
  //   }
  //   fetchData()
  // }, []);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
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
