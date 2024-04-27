import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './ClassListTea.css';

import { data } from '../../loginPage/Login_page';
import { Group } from '../../model/Group';
import { Course } from '../../model/Course';
import { PersonFactory } from '../../model/PersonFactory';
import { Student } from '../../model/Student';
function ClassListTea() {
  // Từ giáo viên đó cậu tìm ra danh sách các môn học mà ổng dạy á
  const [classInfoArray, setClassInfoArray] = useState([
    { name: '0', courseID: 'MT1003', group: 'L17' },
    { name: '0', courseID: 'CS2001', group: 'L18' },
    { name: '0', courseID: 'MT1005', group: 'L19' },
    { name: '0', courseID: 'MT1003', group: 'L15' },
    { name: '0', courseID: 'CS2001', group: 'L18' },
    { name: '0', courseID: 'MT1005', group: 'L13' },
  ]);
  useEffect(() => {
    const loadGroup = async () => {
      //const group = new Group('CO1023', 'L01');
      //await group.loadFromDatabase();
      //group.addStudent("001");
      //const course = new Course("CO1023");
      //await course.loadFromDatabase();
      //alert(course.getName());
      setClassInfoArray([
        { name: 'Giải tích 1', courseID: 'MT1003', group: 'L17' },
        { name: 'Lập trình web', courseID: 'CS2001', group: 'L18' },
        { name: 'Toán cao cấp', courseID: 'MT1005', group: 'L19' },
        { name: 'Giải tích 21', courseID: 'MT1003', group: 'L15' },
        { name: 'Lập trình web 2', courseID: 'CS2001', group: 'L18' },
        { name: 'Toán cao cấp 2', courseID: 'MT1005', group: 'L13' },
        ]);
    };
    loadGroup();
}, []);
  classInfoArray.sort((a, b) => a.name.localeCompare(b.name));
  // Trong phần render
  return (
    <Fragment>
      <Header />
      <Nav key='Nav' />
      <div id="CListPage2">
        <div className="title">
          <h1>Lớp học của tôi</h1>
          <h2>Tổng quan lớp học</h2>
        </div>
        <ul>
          {classInfoArray.map((classInfo, index) => (
            <li key={index} className="ClassList">
              <div className="ClassArray">
                <div className="ClassInfo">
                  <Link to={`/course/CourseView/${classInfo.courseID}/${classInfo.group}`}>
                    {classInfo.name} ({classInfo.courseID})
                  </Link>
                </div>
                <div className="ClassGroup">
                  Nhóm :
                  <Link to={`/course/${classInfo.courseID}/${classInfo.group}`}>
                    {classInfo.group}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </Fragment>
  );
}
export default ClassListTea;