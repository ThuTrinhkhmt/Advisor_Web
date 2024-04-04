import { Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import Home from './pages/Home';
import StudySkill from './pages/StudySkill';
import ClassList from './pages/ClassList';
import Information from './pages/Information';
import './App.css';

function App() {
  return (
    <div id="Platform">
      <div id="Header">
        <div className="WebName">Student Advisor Web</div>
        <div className="Close">
          <i className="ti-share"></i> Đăng xuất
        </div>
      </div>
      <nav id="Nav_Platform">
        <ul>
          <li>
            <Link to="/">
              <i className="ti-home"></i> Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/classList">
              <i className="ti-layers"></i> Danh sách lớp học
            </Link>
          </li>
          <li>
            <Link to="/studySkill">
              <i className="ti-pencil-alt"></i> Hướng dẫn học tập
            </Link>
          </li>
          <li>
            <Link to="/information">
              <i className="ti-user"></i> Thông tin GV
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/information" element={<Information />} />
        <Route path="/classList" element={<ClassList />} />
        <Route path="/studySkill" element={<StudySkill />} />
      </Routes>
    </div>
  );
}

export default App;
