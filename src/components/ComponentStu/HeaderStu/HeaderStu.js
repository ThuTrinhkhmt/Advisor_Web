// HeaderStu.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderStu.css';

function HeaderStu() {
    return (
        <div id="Header">
            <div className="WebName">Student Advisor Web</div>
            <div className="Close">
                <Link to="/studentServer" className = "close">
                    Đăng xuất
                </Link>
            </div>
        </div>
    )
}

export default HeaderStu;
