import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './ClassListTea.css';
import { db, ref, get, child } from "../../firebase/firebase.js";

function ClassListTea() {
  // Mảng chứa các đối tượng classInfo
  const [classInfoArray, setClassInfoArray] = useState([]);
  //m bi khung

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "Course"));
        const tempArray = [];
        snapshot.forEach(childSnapshot => {
          tempArray.push({ name: childSnapshot.val().NameOfCourse, courseID: childSnapshot.val().CodeCourse, group: childSnapshot.val().Description });
        });
        tempArray.sort((a, b) => a.name.localeCompare(b.name));
        setClassInfoArray(tempArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Trong phần render
  return (
    <Fragment>
      <Header />
      <Nav key='Nav' />
      <div id="CListPage">
        <div className="title">
          <h1>Lớp học của tôi</h1>
          <h2>Tổng quan lớp học</h2>
        </div>
        <ul>
          {classInfoArray.map((classInfo, index) => (
            <li key={index} className="ClassList">
              <div className="ClassArray">
                <div className="ClassInfo">
                  {/* Sử dụng thẻ Link để tạo liên kết */}
                  <Link to={`/course/${classInfo.courseID}`}>
                    {classInfo.name} ({classInfo.courseID})
                  </Link>
                </div>
                <div className="ClassGroup">
                  Nhóm :
                  {/* Sử dụng thẻ Link để tạo liên kết */}
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