import './CourseScheduleStu.css';
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu';
import Footer from '../../components/ComponentStu/FooterStu/FooterStu';
import Nav from '../../components/ComponentStu/NavStu/NavStu';
import { Link } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { data } from '../../loginPage/Login_page';

function SubjectTab({ subjectArr }) {
    return (
        <div>
            {subjectArr.map((course, index) => (
                <div className="Subject" key={index}>
                    <div className='NameSub'>
                        <Link to={`/StuCourse/${course.CodeCourse}/${course.Class}/${course.Teacher}`}>{course.Name}({course.CodeCourse}) - {course.Teacher}</Link>
                    </div>
                    <div className='GroupSub'>
                        <p>Nhóm: {course.Class}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

function CourseScheduleStu() {
    const [subjects, setSubjects] = useState([]);
    const id = data.getID(); // Lấy ID của sinh viên
    useEffect(() => {
        const db = getDatabase();
        const studentRef = ref(db, 'Student/' + id + '/Course'); 

        get(studentRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const semesters = Object.keys(data).map((semesterKey) => {
                    const courses = Object.values(data[semesterKey]);
                    return { semester: semesterKey, courses };
                });
                setSubjects(semesters);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [id]); 

    return (
        <Fragment>
            <Header />
            <Nav />
            <div id="CourseScheduleStu1">
                <h1 className='header'>Danh sách khóa học</h1>
                <div>
                    {subjects.map((semesterInfo) => (
                        <div key={semesterInfo.semester}>
                            <h2>Học kì {semesterInfo.semester}</h2>
                            <SubjectTab subjectArr={semesterInfo.courses} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default CourseScheduleStu;
