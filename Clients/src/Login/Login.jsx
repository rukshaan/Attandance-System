import React, { useState } from 'react'
import './../../src/App.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const navigate = useNavigate();

  //if we need to add the user for this app we can change the route as '/added' will add a new user
    const handleSubmit=()=>{
      axios.post('http://localhost:5000/login',{username,password})
      .then(result=>{console.log(result)
        const token = result.data.token;
        console.log('Received Token:', token); 
        localStorage.setItem('token', token);
        navigate('/Home');
       
      })
     .catch(err=>console.log(err))
    };

  return (
    <div className='fields'>
      <input type='text' name='name' placeholder='Enter the username' onChange={(e)=>{setUsername(e.target.value)}}  required/><br/>
      <input type='password' name='password' placeholder='Enter the password' onChange={(e)=>{setPassword(e.target.value)}} required/><br/>
      <button type='submit ' value='submit' onClick={handleSubmit}>Submit / Login here</button>
    </div>
  )
}

export default Login