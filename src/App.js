import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Thay thế BrowserRouter hoặc HashRouter
import Home1 from './pageStu/HomeStu/HomeStu';
import GradeReport1 from './pageStu/GradeReportStu/GradeReportStu';
import CourseSchedule1 from './pageStu/CourseScheduleStu/CourseScheduleStu';
import Information1 from './pageStu/InformationStu/InformationStu';
import CourseRegistation1 from './pageStu/CourseRegistationStu/CourseRegistationStu';
import GradeAppeal1 from './pageStu/GradeAppealStu/GradeAppealStu';
import Home2 from './pageTea/HomeTea/HomeTea';
import StudySkill2 from './pageTea/StudySkillTea/StudySkillTea';
import ClassList2 from './pageTea/ClassListTea/ClassListTea';
import Information2 from './pageTea/InformationTea/InformationTea';
import StudentServer from './loginPage/StudentServer/StudentServer';
import TeacherServer from './loginPage/TeacherServer/TeacherServer';
import PageStu from './pageStu/HomeStu/HomeStu';
import PageTea from './pageTea/HomeTea/HomeTea';
import './App.css';

function App() {
  return (
    <div id="Platform">
      <StudentServer />
        <Routes>
          <Route path="/Stu" element={<Home1 />} />
          <Route path="/informationStu" element={<Information1 />} />
          <Route path="/courseScheduleStu" element={<CourseSchedule1 />} />
          <Route path="/gradeReportStu" element={<GradeReport1 />} />
          <Route path="/gradeAppealStu" element={<GradeAppeal1 />} />
          <Route path = "/courseRegistation" element = {<CourseRegistation1/>} />
          <Route path="/Tea" element={<Home2 />} />
          <Route path="/informationTea" element={<Information2 />} />
          <Route path="/classListTea" element={<ClassList2 />} />
          <Route path="/studySkillTea" element={<StudySkill2 />} />
          <Route path="/studentServer" element={<StudentServer />} />
          <Route path="/pageStu" element={<PageStu />} />
          <Route path="/teacherServer" element={<TeacherServer />} />
          <Route path="/pageTea" element={<PageTea />} />
        </Routes>
        
    </div>
  );
}

export default App;
