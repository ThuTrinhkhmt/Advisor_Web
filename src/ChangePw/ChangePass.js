import './ChangePass.css';
import React, { useState } from 'react';
const login_img=process.env.PUBLIC_URL + 'img/login_page.png'; 
function ChangePassword(){
    const [username, setUsername]=useState('');
    const [old_password, setold_password]=useState('');
    const [new_password, setnew_password]=useState('');
    const checkValue = (event)=>{
        setUsername(event.target.value);
    }
    const checkOldPassword =(event)=>{
        setold_password(event.target.value);
    }
    const updatePassword =(event)=>{
        setnew_password(event.target.value);
    }
    const change =()=>{
        if(username.length >0 && new_password.length>0 && old_password.length>0){
            alert("Change password sussessful!");
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
                
                <input type="text" id="username" onChange={checkValue} placeholder='User name' />
                <input type="text" id="old_password" onChange={checkOldPassword} placeholder='Old password' />
                <input type="text" id="new_password" onChange={updatePassword} placeholder='New password' />
                <button onClick={change}> Change password</button>
            </div>
            
        </div>
    )
};
export default ChangePassword ;
