import React, { Fragment, useState } from 'react';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './AppealAnnounce.css'

function AppealAnnounce() {
    // Này thì từ giáo viên cậu tìm ra danh sách các sinh viên gửi phúc khảo cho ổng luôn, ở mọi lớp luôn nha
    const [students, setStudents] = useState([
        { name: 'Nguyễn Văn A', studentID: '123456', course: 'Giải tích 1', courseID: 'MT1003', group: 'L07', appeal: false, isEdited: false },
        { name: 'Trần Thị B', studentID: '234567', course: 'Lập trình web', courseID: 'CS2001', group: 'L10', appeal: true, isEdited: true },
        { name: 'Phạm Văn C', studentID: '345678', course: 'Toán cao cấp', courseID: 'MT1005', group: 'L15', appeal: false, isEdited: false },
        { name: 'Nguyễn Văn D', studentID: '143456', course: 'Giải tích 1', courseID: 'MT1003', group: 'L07', appeal: false, isEdited: true },
        { name: 'Trần Thị E', studentID: '234367', course: 'Lập trình web', courseID: 'CS2001', group: 'L10', appeal: true, isEdited: false },
        { name: 'Phạm Văn F', studentID: '347378', course: 'Toán cao cấp', courseID: 'MT1005', group: 'L05', appeal: true, isEdited: true },
    ]);

    const handleCheckboxChange = (index) => {
        const updatedStudents = [...students];
        updatedStudents[index].isEdited = !updatedStudents[index].isEdited;
        setStudents(updatedStudents);
    };

    // Lặp qua danh sách sinh viên và tạo div cho những sinh viên đã đăng ký phúc khảo
    const feedbackList = students.map((student, index) => {
        return (
            <div key={index} className="student-info">
                    <div className="name-studentID row1">
                        <div className="col2"><strong>Tên:</strong> {student.name}</div>
                        <div className="col2"><strong>MSSV:</strong> {student.studentID}</div>
                    </div>
                    <div className="course-group row1">
                        <div className="col2"><strong>Môn:</strong> {student.course} ({student.courseID})</div>
                        <div className="col2"><strong>Nhóm:</strong> {student.group}</div>
                    </div>
                <input
                    className='sticky-button'
                    type="checkbox"
                    checked={student.isEdited}
                    onChange={() => handleCheckboxChange(index)}
                />
            </div>
        );
    });

    // Trong phần render
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
