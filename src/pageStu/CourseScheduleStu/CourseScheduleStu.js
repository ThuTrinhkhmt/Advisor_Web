import './CourseScheduleStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
import {Link} from 'react-router-dom';
function SubjectTab({ subjectArr }){
    return (
        <div>
          
            {subjectArr.map((course, index)=> (
                <div className="Subject" key={index}>
                    {/* làm sao truyền đến một môn học xác định */}
                    <div className='NameSub'>
                        <Link to="/StuCourse">{course.subject} ({course.CouseID})_{course.teacher}</Link>
                    </div>
                    <div className='GroupSub'>
                        <p >Nhóm : {course.Group}</p>
                    </div>
                    
                </div>
            )
            )}
           
        </div>    
    );
};
function CourseScheduleStu() {
    const subjects=[
        {subject:"Giải tích 1",
         CouseID: "MT1003",
         Group:"L04",
         teacher : "Nguyễn Phương Hà Lan"
        },
        {subject:"Mô hình hóa",
         CouseID: "CO2011",
         Group:"L17",
         teacher : "Nguyễn Thùy Lâm"
        },
        {subject:"Giải tích 2",
         CouseID: "MT1005",
         Group:"L09",
         teacher : "Ngô gia"
        },
        {subject:"Giải tích 2",
         CouseID: "MT1009",
         Group:"L10",
         teacher : "Hà Lan"
        }
        
    ];
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "CourseScheduleStu1">
                <h1 className='header'>Danh sách khóa học</h1>
                <div>
                    <h2>Học kì 223</h2>
                    <SubjectTab subjectArr={subjects}/>
                    <h2>Học kì 222</h2>
                    <SubjectTab subjectArr={subjects}/>
                    <h2>Học kì 221</h2>
                    <SubjectTab subjectArr={subjects}/>
                </div>
            </div>
        <Footer />
        </Fragment>
    )
}

export default CourseScheduleStu
