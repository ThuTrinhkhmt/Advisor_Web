import './GradeReportStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
function DisplayGrade({Grade}){
    return (
        <table id="Grade_table">
                    <tr class="title1">
                        <td colSpan={7}>Bảng điểm học kì 223</td>
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
    )
}
function GradeReportStu() {
    const Grade=[
        {
            CouseID: 'MT1003',
            Subject: 'Giải tích 1',
            Group: 'L04',
            Redit: '4',
            Grade1: '8',
            Grade2:'8',
            GradeFinal:'8', 
        },
        {
            CouseID: 'MT1005',
            Subject: 'Giải tích 2',
            Group: 'L09',
            Redit: '4',
            Grade1: '7',
            Grade2:'8',
            GradeFinal:'7.5', 
        },
        {
            CouseID: 'CO2011',
            Subject: 'Mô hình hóa',
            Group: 'L17',
            Redit: '4',
            Grade1: '4',
            Grade2:'5',
            GradeFinal:'5', 
        }
    ]
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "SSkillPage">
            <h1>BẢNG ĐIỂM SINH VIÊN</h1>
                <div id="Student_infor">
                    <p>Họ tên: Trần Văn A</p>
                    <p>Mssv: 112233</p>
                    <p>Ngành: KHMT</p>
                </div>
                <select className="Select_sem">
                    <option value="All">Bảng điểm tất cả các kì</option>
                    <option value="KH221">Bảng điểm HK221</option>
                    <option value="KH222">Bảng điểm HK222</option>
                    <option value="KH223">Bảng điểm HK223</option>
                </select>
                <div>
                    <DisplayGrade Grade={Grade}/>
                </div>
                <div className="review">
                    <p>Số tín chỉ học kì:..</p>
                    <p>Trung bình học kì:..</p>
                    <p>Số tín chỉ tích lũy:..</p>
                    <p>Trung bình tích lũy:..</p>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default GradeReportStu
