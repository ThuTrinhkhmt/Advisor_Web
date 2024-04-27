import './GradeReportStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment, useState, useEffect } from 'react'
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { data } from '../../loginPage/Login_page'

let totalAccumulatedCredits = 0;
let accumulatedAverage = 0;

function DisplayGrade({Grade, Semester}){
    // Tính tổng số tín chỉ trong học kỳ
    const totalCredits = Grade.reduce((sum, subject) => sum + Number(subject.credit), 0);

    // Tính trung bình học kỳ (điểm tổng kết * số tín chỉ / tổng số tín chỉ)
    const semesterAverage = Grade.reduce((sum, subject) => sum + Number(subject.Final) * Number(subject.credit), 0) / totalCredits;

    // Cập nhật tổng số tín chỉ tích lũy và trung bình tích lũy
    totalAccumulatedCredits += totalCredits;
    accumulatedAverage = (accumulatedAverage * (totalAccumulatedCredits - totalCredits) + semesterAverage * totalCredits) / totalAccumulatedCredits;

 
    return (
        <div>
        <table id="Grade_table">
                    <tr class="title1">
                        <td className = "strong" colSpan={7}>Bảng điểm {Semester}</td>
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
                                <td>{subject.CodeCourse}</td>
                                <td>{subject.Name}</td>
                                <td>{subject.Class}</td>
                                <td>{subject.credit}</td>
                                <td>{"KT: " + subject.KT + "  TN:" + subject.TN + "  BTL: " + subject.BTL}</td>
                                <td>{subject.Midterm}</td>
                                <td>{subject.Final}</td>
                            </tr>
                    ))
                    }
                    
        </table>
        <div className="review">
            <p>Số tín chỉ học kỳ: {totalCredits}</p>
            <p>Trung bình học kỳ: {semesterAverage.toFixed(2)}</p>
            <p>Số tín chỉ tích lũy: {totalAccumulatedCredits}</p>
            <p>Trung bình tích lũy: {accumulatedAverage.toFixed(2)}</p>
        </div>
        </div>

    )
}
function GradeReportStu() {
    const [Semester, setSemester]= useState('')
    const name = data.getName();
    const id = data.getID();
    const falculity = data.getFaculity();
    const handleSemester =(event)=>{
        setSemester(event.target.value);
    }
    const [grades, setGrades] = useState([]);

    useEffect(() => {
      const db = getDatabase();
      const studentId = id; // Thay đổi ID sinh viên tại đây
      const studentRef = ref(db, 'Student/' + studentId + '/Course');
  
      get(studentRef).then((snapshot) => {
        if (snapshot.exists()) {
          const check = snapshot.val();
          const semesters = Object.keys(check).map((semester) => {
            const courses = Object.keys(check[semester]).map((courseId) => {
              const course = check[semester][courseId];
              return {
                ...course,
                semester,
                courseId
              };
            });
            return {semester, courses};
          });
          setGrades(semesters);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }, []);
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "GradeReportStu">
            <h1>BẢNG ĐIỂM SINH VIÊN</h1>
                <div id="Student_infor">
                    <p>Họ tên: {name}</p>
                    <p>Mssv: {id}</p>
                    <p>Ngành: {falculity}</p>
                </div>
                <select className="Select_sem" onChange={handleSemester}>
                    <option value="All">Bảng điểm tất cả các kì</option>
                    <option value="HK221">Bảng điểm HK221</option>
                    <option value="HK222">Bảng điểm HK222</option>
                    <option value="HK223">Bảng điểm HK223</option>
                </select>
                <div>
                    {(Semester == 'All' || Semester=='' ) ? (
                        <div>
                            {
                            grades.map((semesterData, index)=>(
                                <div key={index}>
                                    <DisplayGrade Grade={semesterData.courses} Semester={semesterData.semester}/>
                                </div>
                            ))
                        }
                        </div>
                        
                        
                    ):
                    (
                        <div>
                        {
                            grades.map((semesterData, index)=>(
                                <div key={index}>
                                    {
                                        Semester == semesterData.semester &&(
                                            <div>
                                                <DisplayGrade Grade={semesterData.courses} Semester={semesterData.semester}/>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                        </div>
                    ) }
                </div>
                
            </div>
            <Footer />
        </Fragment>
    )
}

export default GradeReportStu