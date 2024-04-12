// HeaderStu.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderStu.css';

function HeaderStu() {
    return (
        <div id="Header">
            <div className="WebName">Student Advisor Web</div>
            <Link to="/studentServer" className = "close">
                <div className="Close">
                Đăng xuất
                </div>
            </Link>
        </div>
    )
}

export default HeaderStu;
