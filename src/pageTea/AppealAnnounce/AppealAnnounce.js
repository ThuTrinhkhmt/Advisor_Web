import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './AppealAnnounce.css';
import { data } from '../../loginPage/Login_page';
function AppealAnnounce() {
    const groups= data.getGroup();
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const loadGroup = async () => {
          for (let groupData of groups) {
            const arrStu = groupData.getStudents();
            for (let StuData of arrStu) {
                await StuData.loadFromDatabase();
                if(StuData.getStudentScore(groupData.getCourseID()).getIsAppeal()){
                    setStudents((prevStudents) => {
                        // Kiểm tra nếu sinh viên đã tồn tại
                        const exists = prevStudents.some(
                            (student) => student.studentID === StuData.getID() && student.courseID === groupData.getCourseID()
                        );
                        if (!exists) {
                            return [
                                ...prevStudents, // Giữ lại các phần tử hiện tại
                                {
                                    name: StuData.getName(),
                                    studentID: StuData.getID(),
                                    course: groupData.getCourseName(),
                                    courseID: groupData.getCourseID(),
                                    group: groupData.getName(),
                                    isDone: StuData.getStudentScore(groupData.getCourseID()).getIsDone(),
                                },
                            ];
                        }
                        return prevStudents; // Trả về mảng hiện tại nếu đã tồn tại
                    });
                }
            }
          }
        };
        loadGroup();
    }, [groups]);


    const handleCheckboxChange = (index) => {
        const updatedStudents = [...students];
        updatedStudents[index].isDone = !updatedStudents[index].isDone;
        const groupData= data.getAGroup(updatedStudents[index].courseID, updatedStudents[index].group);
        const StudentData = groupData.getAStudent(updatedStudents[index].studentID);
        StudentData.setIsDone(groupData.getCourseID(),updatedStudents[index].isDone);
        setStudents(updatedStudents);
    };

    const feedbackList = students.map((student, index) => {
        return (
            <div key={index} className="student-info">
                {/* Sử dụng Link để tạo link */}
                    <div className="name-studentID row1">
                    <Link to={`/course/${student.courseID}/${student.group}`} className="student-link">
                        <div className="col2"><strong>Tên:</strong> {student.name}</div>
                    </Link>
                        <div className="col2"><strong>MSSV:</strong> {student.studentID}</div>
                    </div>
                <div className="course-group row1">
                    <div className="col2"><strong>Môn:</strong> {student.course} ({student.courseID})</div>
                    <div className="col2"><strong>Nhóm:</strong> {student.group}</div>
                </div>
                <input
                    className='sticky-button'
                    type="checkbox"
                    checked={student.isDone}
                    onChange={() => handleCheckboxChange(index)}
                />
            </div>
        );
    });

    return (
        <Fragment>
            <Header />
            <Nav />
            <div id="pageAppeal2">
                <h1>Thông báo phúc khảo</h1>
                {feedbackList}
            </div>
            <Footer />
        </Fragment>
    );
}

export default AppealAnnounce;