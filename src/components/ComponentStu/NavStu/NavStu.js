import './NavStu.css'
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function NavStu() {
    return (
        <Fragment>
            <nav id="Nav_Platform">
                <ul>
                    <li>
                        <Link to="/Stu">
                            <i className="ti-home"></i> Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link to="/gradeAppealStu">
                            <i className="ti-comments"></i> Phúc khảo điểm
                        </Link>
                    </li>
                    <li>
                        <Link to="/courseRegistation">
                            <i className="ti-wand"></i> Đăng kí môn học
                        </Link>
                    </li>
                    <li>
                        <Link to="/courseScheduleStu">
                            <i className="ti-list"></i> Danh sách KH
                        </Link>
                    </li>
                    <li>
                        <Link to="/gradeReportStu">
                            <i className="ti-folder"></i> Bảng điểm
                        </Link>
                    </li>
                    <li>
                        <Link to="/informationStu">
                            <i className="ti-user"></i> Thông tin SV
                        </Link>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
}


export default NavStu