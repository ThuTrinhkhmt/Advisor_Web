import './HeaderTea.css'
import { Link } from 'react-router-dom';
function HeaderTea() {
    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('username');
      };
  return (
    <div id="Header">
        <div className="WebName">Teacher Advisor Web</div>
        <Link to="/" className = "close">
            <div className="Close">
            Đăng xuất
            </div>
        </Link>
    </div>
)

}

export default HeaderTea
