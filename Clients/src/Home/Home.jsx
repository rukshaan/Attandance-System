import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/App.css'; 

function Home() {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/');
  };

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      
      <button onClick={goToLoginPage}>Log out</button>
      
    </div>
  );
}

export default Home;
