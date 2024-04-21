import './Login_page.css';
import { Fragment } from 'react';
import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link, Routes } from "react-router-dom";

const login_img=process.env.PUBLIC_URL + 'img/login_page.png'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const login = () => {
    if (username.length > 0 && password.length > 0 && role.length >0) {
      alert(`Login successful! You are logged in as a ${role}.`);
     
    } else {
      alert("Invalid username or password!");
    }
  };
  return (
  
    <div className="login_page">       
      <div className="left_side">
      <img width="300px" height="200px" src={login_img} alt="error"/>   
          <h2>Welcome back!</h2>
          <div id="text">
          <p>Type your username and password <br></br>to join with us.</p>
          </div>
      </div>
      <div className="right_side">       
          <h2>Loginnn!</h2>
          <select id="role" onChange={handleRoleChange} >
            <option value="">Login as:</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          <input type="text" id="username" onChange={handleUsernameChange} placeholder="Type your id or user name" />
          <input type="text" id="password" onChange={handlePasswordChange} placeholder="Type your password" />
          <div id="Buttons">
          {role === '' && (
            
              <button onClick={login}>Login</button>
           
          )}
          {role === 'teacher' && (
            <Link to="/Tea">
              <button onClick={login}>Login</button>
            </Link>
          )}
          {role === 'student' && (
            <Link to="/Stu">
              <button onClick={login}>Login</button>
            </Link>
          )}
              
              <Link id ="Goto" to="/ChangePw">
                <button>Change password</button>
              </Link>
          </div>               
      </div>
    </div>
    
  );
}

export default Login;
