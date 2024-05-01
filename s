[1mdiff --git a/src/loginPage/Login_page.js b/src/loginPage/Login_page.js[m
[1mindex 5fce254..dcb7efd 100644[m
[1m--- a/src/loginPage/Login_page.js[m
[1m+++ b/src/loginPage/Login_page.js[m
[36m@@ -54,60 +54,4 @@[m [mfunction Login() {[m
   );[m
 }[m
 [m
[31m-export default Login;import './Login_page.css';[m
[31m-import { Fragment } from 'react';[m
[31m-import React, { useState } from 'react';[m
[31m-import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";[m
[31m-[m
[31m-const login_img=process.env.PUBLIC_URL + 'img/login_page.png'; [m
[31m-[m
[31m-function Login() {[m
[31m-  const [username, setUsername] = useState('');[m
[31m-  const [password, setPassword] = useState('');[m
[31m-  const [role, setRole] = useState('');[m
[31m-  const handleUsernameChange = (event) => {[m
[31m-    setUsername(event.target.value);[m
[31m-  };[m
[31m-  const handlePasswordChange = (event) => {[m
[31m-    setPassword(event.target.value);[m
[31m-  };[m
[31m-  const handleRoleChange = (event) => {[m
[31m-    setRole(event.target.value);[m
[31m-  };[m
[31m-  const login = () => {[m
[31m-    if (username.length > 0 && password.length > 0 && role.length >0) {[m
[31m-      alert(`Login successful! You are logged in as a ${role}.`);[m
[31m-    } else {[m
[31m-      alert("Invalid username or password!");[m
[31m-    }[m
[31m-  };[m
[31m-  return ([m
[31m-  [m
[31m-    <div className="login_page">       [m
[31m-      <div className="left_side">[m
[31m-      <img width="300px" height="200px" src={login_img} alt="error"/>   [m
[31m-          <h2>Welcome back!</h2>[m
[31m-          <div id="text">[m
[31m-          <p>Type your username and password <br></br>to join with us.</p>[m
[31m-          </div>[m
[31m-      </div>[m
[31m-      <div className="right_side">       [m
[31m-          <h2>Loginnn!</h2>[m
[31m-          <select id="role" onChange={handleRoleChange} >[m
[31m-            <option value="">Login as:</option>[m
[31m-            <option value="teacher">Teacher</option>[m
[31m-            <option value="student">Student</option>[m
[31m-          </select>[m
[31m-          <input type="text" id="username" onChange={handleUsernameChange} placeholder="Type your id or user name" />[m
[31m-          <input type="text" id="password" onChange={handlePasswordChange} placeholder="Type your password" />[m
[31m-          <div id="Buttons">[m
[31m-            <button onClick={login}>Login</button>[m
[31m-            <button>Change password</button>[m
[31m-          </div>               [m
[31m-      </div>[m
[31m-    </div>[m
[31m-    [m
[31m-  );[m
[31m-}[m
[31m-[m
[31m-export default Login;[m
[32m+[m[32mexport default Login;[m
\ No newline at end of file[m
[1mdiff --git a/src/pageTea/CourseView/CourseView.js b/src/pageTea/CourseView/CourseView.js[m
[1mindex c519fce..c05a298 100644[m
[1m--- a/src/pageTea/CourseView/CourseView.js[m
[1m+++ b/src/pageTea/CourseView/CourseView.js[m
[36m@@ -12,6 +12,7 @@[m [mfunction CourseView() {[m
   let { courseID, group } = useParams();[m
       //Từ courseID và group (này là mã môn và nhóm lớp), cậu tìm ra cái class tài liệu hướng dẫn dì á[m
   const [editing, setEditing] = useState(false);[m
[32m+[m[32m  //[m
   const [title, setTitle] = useState('Tiêu đề môn học');[m
   const [content, setContent] = useState('Nội dung môn học');[m
   const [links, setLinks] = useState([]);[m
