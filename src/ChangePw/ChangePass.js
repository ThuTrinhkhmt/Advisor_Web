import './ChangePass.css';
import React, { useState } from 'react';
import { Account } from '../model/Account';
import { useNavigate } from 'react-router-dom';
const login_img=process.env.PUBLIC_URL + 'img/login_page.png'; 
function ChangePassword(){
    const navigate = useNavigate();
    const [role, setRole]=useState('');
    const [username, setUsername]=useState('');
    const [old_password, setold_password]=useState('');
    const [new_password, setnew_password]=useState('');
    
    const checkRole = (event)=>{
        setRole(event.target.value);
    }
    const checkValue = (event)=>{
        setUsername(event.target.value);
    }
    const checkOldPassword =(event)=>{
        setold_password(event.target.value);
    }
    const updatePassword =(event)=>{
        setnew_password(event.target.value);
    }
    const change = async ()=>{
        if(username.length >0 && new_password.length>0 && old_password.length>0){
            // Tạo một đối tượng User mới
            const account = new Account(role, username);
            await account.loadFromDatabase();
            if(account.getPassword() === old_password){
                await account.setPassword(new_password);
                alert("Password changed successfully!");
                navigate('/');
            }else {
                alert("Invalid username or password!");
            }
        } else {
            alert("Invalid username or password!");
        }
    };
    return (
        
        <div className ="change_password">
            <div className="left_side">
                <img width="300px" height="200px" src={login_img} alt="error"/>   
                <ul id="text">
                    <li>Enter your username and old password.</li>
                    <li>If you don't remember your password, contact with us.</li>
                </ul>
            </div>
            <div className="right_side">
                <h2>Reset your password!</h2>
                
                <select type="text" id="role" onChange={checkRole} >
                    <option value="">What's your role</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                </select>
                <input type="text" id="username" onChange={checkValue} placeholder='User name' />
                <input type="text" id="old_password" onChange={checkOldPassword} placeholder='Old password' />
                <input type="text" id="new_password" onChange={updatePassword} placeholder='New password' />
                <button onClick={change}> Change password</button>
            </div>
            
        </div>
    )
};
export default ChangePassword ;