import { Fragment } from 'react';
import './StudentServer.css';
import { Link } from 'react-router-dom';

function StudentServer() {
    return (
        <div className='page'>
            <h1>Login Student Server</h1>
        <Link to="/pageStu" className="login-link">
            Đăng nhập
        </Link>
        <Link to = "/teacherServer">
            Chuyển server st i don't know
        </Link>
        </div>
    );
}

export default StudentServer;
