import './GradeAppealStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment, useState, useEffect } from 'react'
import { data } from '../../loginPage/Login_page' //Sửa thành có một danh sách phúc khảo trước
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
function generateRandomCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function GradeAppealStu() {
    const id = data.getID();
    const Groups={starttime:'01/01/2022', endtime:'15/05/2022'}
    const Student= data;
    const [haveAtleastOne, setHaveAtleastOne] = useState(false);
    const [Subject_can_appeal, setSubject_can_appeal] = useState([]);

    const saveAppealToFirebase = (subject) => {
        const db = getDatabase();
        const appealRef = ref(db, 'Student/' + id + '/Course/HK222/' + subject.CourseID);
    
        update(appealRef, {
            date: subject.Date,
            code: subject.Code, 
            isAppeal: true
        }).then(() => {
            console.log('Data saved successfully.');
        }).catch((error) => {
            console.error('Data could not be saved.' + error);
        });
    }

    useEffect(() => {
        const db = getDatabase();
      
        const studentRef = ref(db, 'Student/' + id + '/Course/HK222');
      
        get(studentRef).then((snapshot) => {
          if (snapshot.exists()) {
            const check = snapshot.val();
            const courses = Object.keys(check).map((courseId) => {
              const course = check[courseId];
              return {
                CourseID: course.CodeCourse,
                Subject: course.Name,
                Group: course.Class,
                Grade: course.Final,
                IsAppeal: course.isAppeal,
                IsDone: course.isDone,
                Code: course.code,
                Date: course.date
              };
            });
            setSubject_can_appeal(courses);
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    }, []);

    const hasAppealSubjects = Subject_can_appeal.some(subject => subject.IsAppeal);

    const confirmAppeal = (subject, index) => {
        if (Subject_can_appeal[index].IsAppeal) {
            alert('Môn học đã được chọn phúc tra!');
        } else {
            const confirmation = window.confirm('Bạn xác nhận phúc tra?');
            if (confirmation) {
                //Bật true lên
            const updatedSubjects = [...Subject_can_appeal];
            const currentDate = new Date().toLocaleDateString(); // Lấy ngày tháng hiện tại
            updatedSubjects[index].IsAppeal = true;
            updatedSubjects[index].Code = '#' + generateRandomCode(4);
            updatedSubjects[index].Date = currentDate;
            setSubject_can_appeal(updatedSubjects); // Cập nhật state
            saveAppealToFirebase(updatedSubjects[index]);
            alert('Xác nhận phúc tra thành công!');
            }
        }
    }
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id="GradeAppealStu1">
                <h1>Phúc tra điểm</h1>
                <div className='Infor1'>
                    <div className="Student_infor">
                        <p>Họ tên: {Student.getName()}</p>
                        <p>Mssv: {Student.getID()}</p>
                        <p>Ngành: {Student.getFaculity()}</p>
                    </div>
                    <div className="Realtime_infor">
                        <p>Học kì: 222.</p>
                        <p>Thời gian phúc tra: {Groups.starttime} - {Groups.endtime}.</p>
                    </div>
                </div>
                <div className="Appeal">
                    <div className='Infor2'>
                        <p>- Chỉ chấp nhận phúc tra bài tự luận.</p>
                        <p>- Phúc tra được thực hiện tại Khoa/ Bộ môn và giảng viên môn học.</p>
                        <p>- Kết quả phúc tra được cập nhật tại đây và bảng điểm(nếu có).</p>
                    </div>
                    <table>
                <thead>
                    <tr className='title1'>
                        <td className='shell'>Mã môn học</td>
                        <td className='shell'>Môn học</td>
                        <td className='shell'>Nhóm lớp</td>
                        <td className='shell'>Điểm</td>
                        <td>Xác nhận phúc tra</td>
                    </tr>
                </thead>
                <tbody>
                    {Subject_can_appeal.map((subject, index) => (
                        <tr key={index}>
                            <td>{subject.CourseID}</td>
                            <td>{subject.Subject}</td>
                            <td>{subject.Group}</td>
                            <td>{subject.Grade}</td>
                            <td className='Confirm'>
                                <button className="btn-appeal-stu" onClick={() => confirmAppeal(subject, index)}>Xác nhận phúc tra</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table>
                        <thead>
                            <tr className='title1'>
                                <td width='300px'>Mã phiếu phúc tra</td>
                                <td width='300px'>Ngày đăng ký</td>
                                <td width='300px'>Mã môn học</td>
                                <td width='300px'>Môn học</td>
                                <td width='300px'>Xác nhận của giảng viên</td>
                            </tr>
                        </thead>
                        <tbody>
                        {hasAppealSubjects ? (
                        Subject_can_appeal.map((subject, index) => (
                        subject.IsAppeal && (
                            <tr key={index}>
                                <td>{subject.Code}</td>
                                <td>{subject.Date}</td>
                                <td>{subject.CourseID}</td>
                                <td>{subject.Subject}</td>
                                {subject.IsDone ? (
                                    <td>Đã xử lý</td>
                                ) : (
                                    <td>Chưa xử lý</td>
                                )}
                            </tr>
                        )
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">Chưa có môn học đăng kí phúc tra</td>
                    </tr>
                )}
                        </tbody>
            </table>
            </div>

            </div>
            <Footer />
        </Fragment>
    )
}
export default GradeAppealStu