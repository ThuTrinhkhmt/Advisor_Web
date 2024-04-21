import './CourseRegistationStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
function RegistedTab({registedSub}){
    return (
        <table>
            <thead>
                <tr>
                    <td colSpan={5}>
                        Môn học đã đăng kí
                    </td>
                </tr>
                <tr>
                    <td>Mã môn học</td>
                    <td>Môn học</td>
                    <td>Số tín chỉ</td>
                    <td>Nhóm lớp</td>
                    <td>Sĩ số</td>
                </tr>
            </thead>
            <tbody>
                {
                    registedSub.map((course, index)=>(
                        <tr key={index}>
                        <td>{course.CourseID}</td>
                        <td>{course.Subject}</td>
                        <td>{course.Credit}</td>
                        <td>{course.Group}</td>
                        <td>{course.NumberStu}</td>
                        </tr>
                    )
                )
                }
            </tbody>
        </table>
    );
}
function CourseRegistationStu() {
    const registedSub=[{
        CourseID:"MT1003",
        Subject:"Giải tích 1",
        Group:"L04",
        Credit:"4",
        NumberStu:"20/30"
    },
    {
        CourseID:"MT1005",
        Subject:"Giải tích 2",
        Group:"L05",
        Credit:"4",
        NumberStu:"25/30"
    },
    {
        CourseID:"CO2011",
        Subject:"Mô hình hóa",
        Group:"L17",
        Credit:"4",
        NumberStu:"2/30"
    }
    ]
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "InformationPage">
                <h1>Đăng kí khóa học</h1>
                <p>Học kì: 223.</p>
                <p style={{fontStyle: 'italic'}}>Thời gian đăng kí: 10/07/2022 - 20/7/2022.</p>
                <p>Sinh viên cần nhập đúng tên môn học hoặc mã môn.</p>
                <p>Các thao tác ngoài thời gian đăng kí môn sẽ không được chấp nhận.</p>
                <div className="head">
                    <input id="Inputsubject" placeholder="Insert name subject or code"></input>
                    <button> Find </button>
                </div>
                <div className="Registed_sub">
                    <RegistedTab registedSub={registedSub}/>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default CourseRegistationStu
