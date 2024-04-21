import './CourseScheduleStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
import {Link} from 'react-router-dom';

function SubjectTab({ subjectArr }){
    return (
        <div>
            <ul>
            {subjectArr.map((course, index)=> (
                <li className="Subject" key={index}>
                    <Link className='NameSub' to="/StuCourse">{course.subject} ({course.CouseID})</Link>
                    <p className='GroupSub'>{course.Group}</p>
                </li>
            )
            )}
            </ul>
        </div>
        
    );
};

function CourseScheduleStu() {
    const subjects=[
        {subject:"Giải tích 1",
         CouseID: "MT1003",
         Group:"L04"
        },
        {subject:"Mô hình hóa",
         CouseID: "CO2011",
         Group:"L17"
        },
        {subject:"Giải tích 2",
         CouseID: "MT1005",
         Group:"L09"
        }
        
    ];
    subjects.sort((a, b) => a.subject.localeCompare(b.subject));
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "CourseScheduleStu1">
                <h1 className='header'>Danh sách khóa học</h1>
                <div>
                    <SubjectTab subjectArr={subjects}/>
                </div>
            </div>
        <Footer />
        </Fragment>
    )
}

export default CourseScheduleStu
