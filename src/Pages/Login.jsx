import React, { useState } from 'react';
// import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import logoImg from '../Img/logo.png';
import { Card, Logo, Form, Input, Button, Error } from '../Components/AuthForm';
import { useAuth } from '../Context/auth';

function Login(props) {
  // const referer = props.state.location.referer || '/'
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();

  const postLogin = async () => {
    try {
      const resp = await fetch(
        'https://puckllay-back.herokuapp.com/login/teacher',
        {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { ok, data } = await resp.json();
      if (ok) {
        setAuthTokens(data.token);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  if (isLoggedIn) {
    return <Redirect to='/admin' />;
  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
      {isError && (
        <Error>The username or password provided were incorrect!</Error>
      )}
    </Card>
  );
}

export default Login;
