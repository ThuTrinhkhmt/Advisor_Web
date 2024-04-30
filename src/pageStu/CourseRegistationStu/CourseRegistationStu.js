import './CourseRegistationStu.css';
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu';
import Footer from '../../components/ComponentStu/FooterStu/FooterStu';
import Nav from '../../components/ComponentStu/NavStu/NavStu';
import { Fragment, useState, useEffect } from 'react';
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { data } from '../../loginPage/Login_page';

function CourseRegistationStu() {
    const [database, setDatabase] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [registedSub, setRegistedSub] = useState([]);
    const [findSub, setFindSub] = useState('');

    useEffect(() => {
        const db = getDatabase();
        const dataRef = ref(db);

        get(dataRef).then((snapshot) => {
            if (snapshot.exists()) {
                setDatabase(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleFindSub = () => {
        const inputSubject = findSub;
        const foundSubjects = [];
        if (database) {
            for (const courseCode in database.Course) {
                const course = database.Course[courseCode];
                if (course.CodeCourse === inputSubject || course.NameOfCourse === inputSubject) {
                    for (const groupKey in course.Group) {
                        const group = course.Group[groupKey];
                        const subject = {
                            CourseID: course.CodeCourse,
                            Subject: course.NameOfCourse,
                            Group: groupKey,
                            Credit: course.NumOfCredits,
                            NumberStu: Object.keys(group.Student).length,
                            IsRegist: false
                        };
                        foundSubjects.push(subject);
                    }
                }
            }
        }
        setSubjects(foundSubjects);
    };

    const confirmDelete = (index) => {
        const updatedRegistedSub = [...registedSub];
        const course = updatedRegistedSub[index];

        if (!course.IsDelete) {
            const confirmation = window.confirm('Bạn xác nhận hủy môn?');
            if (confirmation) {
                course.IsDelete = true;
                setRegistedSub(updatedRegistedSub);
                alert('Hủy môn thành công.');
            }
        } 
    };

    const confirmRegist = (index) => {
        const updatedSubjects = [...subjects];
        const updatedRegistedSub = [...registedSub];
        const course = updatedSubjects[index];

        if (!course.IsRegist) {
            const confirmation = window.confirm('Bạn xác nhận đăng kí?');
            if (course.NumberStu >= 30) {
                alert('Lớp đã quá số lượng thành viên');
            } else if (confirmation) {
                course.IsRegist = true;
                setSubjects(updatedSubjects);

                const obj = {
                    CourseID: course.CourseID,
                    Subject: course.Subject,
                    Group: course.Group,
                    Credit: course.Credit,
                    NumberStu: course.NumberStu,
                    IsDelete: false
                };
                updatedRegistedSub.push(obj);
                saveRegistationToFirebase(obj);
                setRegistedSub(updatedRegistedSub);
                alert('Đăng kí thành công.');
            }
        } else {
            alert('Không thể đăng ký môn học do đã đăng kí, trùng tiết hoặc nằm ngoài thời gian đăng kí!');
        }
    };

    const saveRegistationToFirebase = (subject) => {
        const db = getDatabase();
        const regisRef = ref(db, `Student/${data.getID()}/Course/HK223/${subject.CourseID}`);
        const classRef = ref(db, `Course/${subject.CourseID}/Group/${subject.Group}/Student/${data.getID()}`);

        set(classRef, {
            week: {
                '0o1': {
                    comment: "",
                    score: ""
                },
                '0o2': {
                    comment: "",
                    score: ""
                },
                '0o3': {
                    comment: "",
                    score: ""
                },
                '0o4': {
                    comment: "",
                    score: ""
                }
            }
        })
        set(regisRef, {
            Class: subject.Group,
            CodeCourse: subject.CourseID,
            appealTime: {
                EndTime: "",
                StartTime: ""
            },
            Name: subject.Subject,
            Teacher: "",
            code: "",
            componentScore: "",
            credit: subject.Credit,
            date: "",
            examScore: "",
            isAppeal: false,
            isDone: false,
            totalScore: ""
        }).then(() => {
            console.log('Data saved successfully.');
        }).catch((error) => {
            console.error('Data could not be saved.' + error);
        });
    };

    return (
        <Fragment>
            <Header />
            <Nav />
            <div id="CourseRegistationStu1">
                <h1>Đăng kí khóa học</h1>
                <div className='Infor'>
                    <p>Học kì: 223.</p>
                    <p style={{ fontStyle: 'italic' }}>Thời gian đăng kí: {database && database.Course && database.Course.RegisTime ? `${database.Course.RegisTime.StartTime} - ${database.Course.RegisTime.EndTime}` : ''}.</p>
                    <p className="red">Sinh viên cần nhập đúng mã môn hoặc tên môn học.</p>
                    <p className="red">Các thao tác ngoài thời gian đăng kí môn sẽ không được chấp nhận.</p>
                </div>

                <div className="head">
                    <input id="Inputsubject" placeholder="Insert name subject or code" value={findSub} onChange={(e) => setFindSub(e.target.value)} />
                    <button onClick={handleFindSub}> Find </button>
                </div>
                {
                    findSub !== '' && subjects.length > 0 && (
                        <div>
                            <table className='RegistSub'>
                                <thead>
                                    <tr>
                                        <td className='title1' colSpan={7}>
                                            Danh sách môn học
                                        </td>
                                    </tr>
                                    <tr className='title2'>
                                        <td width='200px'>Mã môn học</td>
                                        <td width='200px'>Môn học</td>
                                        <td width='100px'>Số tín chỉ</td>
                                        <td width='100px'>Nhóm lớp</td>
                                        <td width='100px'>Sĩ số</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjects.map((subject, index) => (
                                        <tr key={index}>
                                            <td>{subject.CourseID}</td>
                                            <td>{subject.Subject}</td>
                                            <td>{subject.Credit}</td>
                                            <td>{subject.Group}</td>
                                            <td>{subject.NumberStu}</td>
                                            <td>
                                                <button onClick={() => confirmRegist(index)}>Đăng ký</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
                <table className='RegistedTab'>
                    <thead>
                        <tr>
                            <td className='title1' colSpan={6}>
                                Môn học đã đăng kí
                            </td>
                        </tr>
                        <tr className='title2'>
                            <td width='200px'>Mã môn học</td>
                            <td width='200px'>Môn học</td>
                            <td width='100px'>Số tín chỉ</td>
                            <td width='100px'>Nhóm lớp</td>
                            <td width='100px'>Sĩ số</td>
                            <td>Đăng kí hủy môn</td>
                        </tr>
                    </thead>
                    <tbody>
                        {registedSub.map((course, index) => (
                            (!course.IsDelete) && (
                                <tr key={index}>
                                    <td>{course.CourseID}</td>
                                    <td>{course.Subject}</td>
                                    <td>{course.Credit}</td>
                                    <td>{course.Group}</td>
                                    <td>{course.NumberStu}</td>
                                    <td>
                                        <button className='confirm' onClick={() => confirmDelete(index)}>
                                            Đăng kí hủy môn
                                        </button>
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </Fragment>
    );
}

export default CourseRegistationStu;
