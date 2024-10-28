import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './Util';

function SignUp() {
  const initial = {
    name: '',
    email: '',
    password: '',
  };
  const navigate = useNavigate();
  const [signupInfo, setSignUpInfo] = useState(initial);
  const handleInput = (e) => {
    const { name, value } = e.target;

    setSignUpInfo({
      ...signupInfo,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //add client side validation
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('All fields are required!');
    }
    try {
      const response = await fetch('https://simple-auth-app-api.vercel.app/api/signup', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      //showing toast of server side validation
      const { msg, success, error } = result;
      if (!success) {
        handleError(msg);
      }
      if (success) {
        handleSuccess(msg);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const detail = error.details[0].message;
        console.log(detail);
        handleError(detail);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            value={signupInfo.name}
            autoFocus
            placeholder="Enter Your Name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleInput}
            value={signupInfo.email}
            name="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={signupInfo.password}
            onChange={handleInput}
            placeholder="Enter Your Password"
          />
        </div>
        <button>Signup</button>
        <span>
          Already have an account ?<Link to={'/login'}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
