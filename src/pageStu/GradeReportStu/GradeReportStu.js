import './GradeReportStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment, useState } from 'react'
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
                                <td>{subject.Grade1}</td>
                                <td>{subject.Grade2}</td>
                                <td>{subject.GradeFinal}</td>
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
    const [Semester, setSemester]= useState('')
    const handleSemester =(event)=>{
        setSemester(event.target.value);
    }
    const Grade =[
        {
            semester: 221,
            GradeSem: [
                {   
                    CouseID: 'MT1003',
                    Subject: 'Giải tích 1',
                    Group: 'L04',
                    Redit: '4',
                    componentScore: "KT:8 BTL:8 TN:8",
                    examScore: '8.0',
                    totalScore: '8.0', 
                },
                {   
                    CouseID: 'MT1005',
                    Subject: 'Giải tích 2',
                    Group: 'L09',
                    Redit: '4',
                    componentScore: "KT:8 BTL:8 TN:8",
                    examScore: '8.0',
                    totalScore: '8.0',
                },
                {
                    CouseID: 'CO2011',
                    Subject: 'Mô hình hóa',
                    Group: 'L17',
                    Redit: '4',
                    componentScore: "KT:8 BTL:8 TN:8",
                    examScore: '8.0',
                    totalScore: '8.0',
                }]
            
        },
        {
            semester: 222,
            GradeSem:[
                {
                    CouseID: 'MT1003',
                    Subject: 'Giải tích 3',
                    Group: 'L04',
                    Redit: '4',
                    componentScore: "KT:8 BTL:8 TN:8",
                    examScore: '8.0',
                    totalScore: '8.0',
                },
                {
                    CouseID: 'MT1005',
                    Subject: 'Giải tích 2',
                    Group: 'L09',
                    Redit: '4',
                    componentScore: "KT:8 BTL:8 TN:8",
                    examScore: '8.0',
                    totalScore: '8.0',
                },
                {
                    CouseID: 'CO2011',
                    Subject: 'Mô hình hóa',
                    Group: 'L17',
                    Redit: '4',
                    componentScore: "KT:8 BTL:8 TN:8",
                    examScore: '8.0',
                    totalScore: '8.0', 
                }
            ]
        },
        {
            semester: 223,
            GradeSem:[
                {
                    CouseID: 'MT1003',
                    Subject: 'Giải tích 4',
                    Group: 'L04',
                    Redit: '4',
                    componentScore: "KT:8 BTL:8 TN:8",
                    examScore: '8.0',
                    totalScore: '8.0', 
                },
                {
                    CouseID: 'MT1005',
                    Subject: 'Giải tích 2',
                    Group: 'L09',
                    Redit: '4',
                    componentScore: "KT:8 BTL:8 TN:8",
                    examScore: '8.0',
                    totalScore: '8.0',
                },
                {
                    CouseID: 'CO2011',
                    Subject: 'Mô hình hóa',
                    Group: 'L17',
                    Redit: '4',
                    componentScore: "KT:8 BTL:8 TN:8",
                    examScore: '8.0',
                    totalScore: '8.0',
                }
            ]

        }
    ]

    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "GradeReportStu">
            <h1>BẢNG ĐIỂM SINH VIÊN</h1>
                <div id="Student_infor">
                    <p>Họ tên: Trần Văn A</p>
                    <p>Mssv: 112233</p>
                    <p>Ngành: KHMT</p>
                </div>
                <select className="Select_sem" onChange={handleSemester}>
                    <option value="All">Bảng điểm tất cả các kì</option>
                    <option value="221">Bảng điểm HK221</option>
                    <option value="222">Bảng điểm HK222</option>
                    <option value="223">Bảng điểm HK223</option>
                </select>
                <div>
                    {(Semester == 'All' || Semester=='' ) ? (
                        <div>
                            {
                            Grade.map((semester, index)=>(
                                <div key={index}>
                                    <DisplayGrade Grade={semester.GradeSem} Semester={semester.semester}/>
                                </div>
                            ))
                        }
                        </div>
                        
                        
                    ):
                    (
                        <div>
                        {
                            Grade.map((semester, index)=>(
                                <div key={index}>
                                    {
                                        Semester == semester.semester &&(
                                            <div>
                                                <DisplayGrade Grade={semester.GradeSem} Semester={semester.semester}/>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                        </div>
                    ) }
{/*                 
                    {Semester == '222' &&(
                        <div>
                        <DisplayGrade Grade={Semester222} Semester={Semester}/>
                        </div>
                    )}
                    {Semester == '223' &&(
                        <div>
                        <DisplayGrade Grade={Semester223} Semester={Semester}/>
                        </div>
                    )} */}
                       
                       
                    
                </div>
                
            </div>
            <Footer />
        </Fragment>
    )
}

export default GradeReportStu
