import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './Util';

function Login() {
  const initial = {
    email: '',
    password: '',
  };
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState(initial);
  const handleInput = (e) => {
    const { name, value } = e.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('All fields required');
    }
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      console.log(result);
      const { success, msg, error, jwtToken, name } = result;
      console.log(msg);
      if (success) {
        handleSuccess(msg);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const detail = error.details[0].message;
        handleError(detail);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(loginInfo);
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleInput}
            name="email"
            value={loginInfo.email}
            placeholder="Enter Your Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleInput}
            value={loginInfo.password}
            placeholder="Enter Your Password"
          />
        </div>
        <button>Login</button>
        <span>
          Don't have account ?<Link to={'/signup'}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
