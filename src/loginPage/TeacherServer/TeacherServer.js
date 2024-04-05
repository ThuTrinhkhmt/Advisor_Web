/* Nội dung trang login server giáo viên */
/* Giả sử đăng nhập thành công, vậy sẽ có một cái nút, bấm vô là qua server giáo viên */
/* Đầu tiên là ở server Học Sinh, nếu muốn chuyển qua server giáo viên thì có một nút để chuyển qua nè */
/* Nội dung trang login server học sinh */
/* Giả sử đăng nhập thành công, vậy sẽ có một cái nút, bấm vô là qua server học sinh */
import './TeacherServer.css'
import { Link } from 'react-router-dom';

function TeacherServer() {
    return (
        <div className='page'>
            <h1>Login Teacher Server</h1>
        <Link to="/pageTea" className="login-link">
            Đăng nhập
        </Link>
        <Link to = "/studentServer">
            Chuyển server
        </Link>
        </div>
    );
}

export default TeacherServer;