import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './AppealAnnounce.css';
import { data } from '../../loginPage/Login_page';
function AppealAnnounce() {

    const [students, setStudents] = useState([
        { name: 'Nguyễn Văn A', studentID: '001', course: 'Công nghệ phần mềm', courseID: 'CO2018', group: 'L01', appeal: false, isDone: false },
        { name: 'Trần Văn B', studentID: '002', course: 'Công nghệ phần mềm', courseID: 'CO2018', group: 'L01', appeal: true, isDone: true },
    ]);

    const handleCheckboxChange = (index) => {
        const updatedStudents = [...students];
        updatedStudents[index].isDone = !updatedStudents[index].isDone; //cập nhật lại isDone nè
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