import './Login_page.css';
import { Fragment } from 'react';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { PersonFactory } from '../model/PersonFactory';
import { Account } from '../model/Account';
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
    const account= new Account(role, username);
    const teacherData = await PersonFactory.createPerson('Teacher', username);
    await teacherData.loadFromDatabase();
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    localStorage.setItem('teacher1', JSON.stringify(teacherData));
    await account.loadFromDatabase();
    if (username.length > 0 && password.length > 0 && role.length >0) {
      if (account.getPassword() === password) {
        alert(`Login successful! You are logged in as a ${role}.`);
        // Điều hướng đến trang chính sau khi đăng nhập thành công
        if(role==="Teacher") {
          navigate('/Tea');
        } else {
          navigate('/Stu');
        }
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
          <h1>Welcome back!</h1>
          <div id="text">
          <p>Type your username and password <br></br>to join with us.</p>
          </div>
      </div>
      <div className="right_side">       
          <h1>Loginnn!</h1>
          <select id="role" onChange={handleRoleChange} >
            <option value="">Login as:</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
          <input type="text" id="username" onChange={handleUsernameChange} placeholder="Type your id or user name" />
          <input type="password" id="password" onChange={handlePasswordChange} placeholder="Type your password" />
          <div id="Buttons">
            <Link id = "Goto">
              <button className = "btn-loginpage" onClick={login}>Login</button>
            </Link>
            
            <Link id ="Goto" to="/ChangePw">
              <button className = "btn-loginpage" >Change password</button>
            </Link>
          </div>               
      </div>
    </div>
    
  );
}
export default Login;
