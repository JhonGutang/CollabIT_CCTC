'use client'

import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { useState } from "react";

const Auth = () => {
  const [baseAuth, setBaseAuth] = useState('login');
  const toggleAuthComponent = (auth: string) => {
    setBaseAuth(auth)
  }
  return <div>{baseAuth === 'login' ? <Login toggleHandler={toggleAuthComponent} /> : <Register toggleHandler={toggleAuthComponent}  />}</div>;
};

export default Auth;
