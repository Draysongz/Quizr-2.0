import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { app } from './firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      toast.success('Logged in');
      navigate('/main');
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  return (
    <div className="login">
      <div className="left">
        <div className="box">
          <h1 className="heading">
            Digital <br />
            platform <br />
            for distance <br />
            <span className="learn">learning.</span>
          </h1>
          <h4 className="caption">You will never know everything</h4>
        </div>
      </div>

      <div className="right">
        <form className="loginForm">
          <h2>Hey there, </h2>
          <p className="des">Enter the details below</p>
          <input type="email" placeholder="Email address" name="email" className="email" onChange={handleEmailChange} />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="pass"
            onChange={handlePasswordChange}
          />
          <button className="loginBtn" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
