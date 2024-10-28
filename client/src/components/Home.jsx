import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './Util';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Log out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };
  const fetchProduct = async () => {
    try {
      //providing jwt token for accessing token protected api
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const response = await axios('http://localhost:3000/product', headers);
      console.log('HOME RESPONSE', response);
      const result = await response.data;
      setProductData(result);
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <div>
        <h1>Welcome {loggedInUser}</h1>
        <div>
          <h2>List of items</h2>
          {productData.map((item, index) => (
            <ul key={index}>
              <li>{item.name}</li>
              <li>{item.price}</li>
            </ul>
          ))}
        </div>
        <button onClick={handleLogout}>Logout</button>

        <ToastContainer />
      </div>
    </>
  );
}

export default Home;
