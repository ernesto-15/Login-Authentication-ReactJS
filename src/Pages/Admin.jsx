import React from "react";
import { Button } from "../Components/AuthForm";
import { useAuth } from "../Context/auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();
  const logOut = () => {
    setAuthTokens(null)
  }
  return <div>
    <div>Admin Page</div>
    <Button onClick={logOut} >Log Out</Button>
  </div>;
}

export default Admin;