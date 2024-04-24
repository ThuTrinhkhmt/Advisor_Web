import './ChangePass.css';
import React, { useState } from 'react';
import {Link } from 'react-router-dom'
const login_img=process.env.PUBLIC_URL + 'img/login_page.png'; 
function ChangePassword(){
    const [username, setUsername]=useState('');
    const [old_password, setold_password]=useState('');
    const [new_password, setnew_password]=useState('');
    const [role, setRole] = useState('');
    const [IsChanged, setIsChanged] = useState(false);
    const checkValue = (event)=>{
        setUsername(event.target.value);
    }
    const checkOldPassword =(event)=>{
        setold_password(event.target.value);
    }
    const updatePassword =(event)=>{
        setnew_password(event.target.value);
    }
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const change =()=>{
        if(username.length >0 && new_password.length>0 && old_password.length>0){
            alert("Change password sussessful! Please login.");
            setIsChanged(true);
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
                <select className="role" onChange={handleRoleChange} >
                    <option value="">Login as:</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </select>
                <input type="text" id="username" onChange={checkValue} placeholder='User name' />
                <input type="password" id="old_password" onChange={checkOldPassword} placeholder='Old password' />
                <input type="password" id="new_password" onChange={updatePassword} placeholder='New password' />
                <button onClick={change}> Change password</button>
                {IsChanged &&(
                    <button>
                         <Link to ='/'>Go to Login</Link>
                    </button>         
                    )
                }
            </div>
            
        </div>
    )
};
export default ChangePassword ;
