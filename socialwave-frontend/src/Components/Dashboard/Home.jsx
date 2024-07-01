import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);
  return (
    <div>
      heloo from home 
    </div>
  )
}

export default Home
