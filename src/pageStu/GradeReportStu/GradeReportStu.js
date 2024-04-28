import './GradeReportStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment, useState, useEffect } from 'react'
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js"; 
function DisplayGrade({Grade, Semester}){
    return (
        <div>
        <table id="Grade_table">
                    <tr class="title1">
                        <td className = "strong" colSpan={7}>Bảng điểm học kì {Semester}</td>
                    </tr>
                    <tr class="title2">
                        <td rowSpan={2}>Mã môn học</td>
                        <td rowSpan={2}>Môn học</td>
                        <td rowSpan={2}>Nhóm lớp</td>
                        <td rowSpan={2}>Số Tín chỉ</td>
                        <td colSpan={3}>Điểm môn học</td> 
                    </tr>
                    <tr>
                        <td>Điểm thành phần</td>
                        <td>Kiểm tra</td>
                        <td>Tổng kết</td>
                    </tr>
                    {
                    Grade.map((subject, index)=>(
                            <tr key={index}>
                                <td>{subject.CouseID}</td>
                                <td>{subject.Subject}</td>
                                <td>{subject.Group}</td>
                                <td>{subject.Redit}</td>
                                <td>{subject.componentScore}</td>
                                <td>{subject.examScore}</td>
                                <td>{subject.totalScore}</td>
                            </tr>
                    ))
                    }
                    
        </table>
        <div className="review">
            <p>Số tín chỉ học kì:..</p>
            <p>Trung bình học kì:..</p>
            <p>Số tín chỉ tích lũy:..</p>
            <p>Trung bình tích lũy:..</p>
        </div>
        </div>

    )
}
function GradeReportStu() {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
      const db = getDatabase();
      const studentId = '1234567'; // Thay đổi ID sinh viên tại đây
      const studentRef = ref(db, 'Student/' + studentId + '/Course');
  
      get(studentRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const semesters = Object.keys(data).map((semester) => {
            const courses = Object.keys(data[semester]).map((courseId) => {
              const course = data[semester][courseId];
              return {
                ...course,
                semester,
                courseId
              };
            });
            return courses;
          }).flat();
          setGrades(semesters);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }, []);
  
    return (
      <div>
        <h1>Bảng Điểm Sinh Viên</h1>
        <table>
          <thead>
            <tr>
              <th>Học Kỳ</th>
              <th>Mã Môn</th>
              <th>Điểm TN</th>
              <th>Điểm KT</th>
              <th>Điểm Thi</th>
              <th>Điểm Tổng Kết</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.semester}</td>
                <td>{grade.courseId}</td>
                <td>{grade.TN}</td>
                <td>{grade.KT}</td>
                <td>{grade.Final}</td>
                <td>{(parseFloat(grade.TN) + parseFloat(grade.KT) + parseFloat(grade.Final)) / 3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default GradeReportStu
