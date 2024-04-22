import './Login_page.css';
import { Fragment } from 'react';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import { Account } from '../model/Account';
import { PersonFactory } from '../model/PersonFactory';
const login_img=process.env.PUBLIC_URL + 'img/login_page.png'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const login = async() => {
    const account=new Account(role, username);
    await account.loadFromDatabase();
    localStorage.setItem('personID', JSON.stringify({ id: account.getID() }));
    localStorage.setItem('personRole', JSON.stringify({role: account.getRole()}));
    if (username.length > 0 && password.length > 0 && role.length >0) {
      if (account.getPassword() === password) {
        alert(`Login successful! You are logged in as a ${role}.`);
        // Điều hướng đến trang chính sau khi đăng nhập thành công
        if(role==="Teacher") navigate('/Tea'); else navigate('/Stu');
      } else {
        alert("Invalid username or password!");
      }
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
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
          <input type="text" id="username" onChange={handleUsernameChange} placeholder="Type your id or user name" />
          <input type="password" id="password" onChange={handlePasswordChange} placeholder="Type your password" />
          <div id="Buttons">
            <button onClick={login}>Login</button>
            <button>Change password</button>
          </div>               
      </div>
    </div>
    
  );
}

export default Login;
