import './HeaderTea.css'
import { Link } from 'react-router-dom';
function HeaderTea() {
  return (
    <div id="Header">
        <div className="WebName">Teacher Advisor Web</div>
        <div className="Close">
            <Link to="/teacherServer" className = "close">
                {/* <i className="ti-share"></i> */}
                Đăng xuất
            </Link>
        </div>
    </div>
)

}

export default HeaderTea