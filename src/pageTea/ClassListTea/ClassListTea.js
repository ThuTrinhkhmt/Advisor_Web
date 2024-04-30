import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './ClassListTea.css';

import { data } from '../../loginPage/Login_page';
function ClassListTea() {
  // Từ giáo viên đó cậu tìm ra danh sách các môn học mà ổng dạy á
  const [classInfoArray, setClassInfoArray] = useState([]);
  useEffect(() => {
    const loadGroup = async () => {
      const arrayGroup= data.getGroup();
      if (arrayGroup && arrayGroup.length > 0) {
        setClassInfoArray(arrayGroup.map((group) => ({
          name: group.getCourseName(),
          courseID: group.getCourseID(),
          group: group.getName(),
        })));
      }
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