import './CourseRegistationStu.css';
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu';
import Footer from '../../components/ComponentStu/FooterStu/FooterStu';
import Nav from '../../components/ComponentStu/NavStu/NavStu';
import { Fragment, useState, useEffect } from 'react';
import { getDatabase, ref, get, set, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { data } from '../../loginPage/Login_page';

function CourseRegistationStu() {
    const [database, setDatabase] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [registedSub, setRegistedSub] = useState([]);
    const [findSub, setFindSub] = useState('');
    const [regisTime, setRegisTime] = useState('');
    useEffect(() => {
        const db = getDatabase();
        const regisTimeRef = ref(db, 'Course/RegisTime');

        get(regisTimeRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setRegisTime(`${data.StartTime} - ${data.EndTime}`);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);
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
                alert('Hủy môn thành công.');
                const db = getDatabase();
                const Ref = ref(db, `CourseRegisted/${data.getID()}/${course.Subject}`);
                remove(Ref).then(() => {
                    console.log("Môn học đã được xóa khỏi Firebase");
                }).catch((error) => {
                    console.error("Lỗi xóa môn học từ Firebase: ", error);
                });
                setRegistedSub(updatedRegistedSub);
            }
        } 
    };

    const confirmRegist = (index) => {
        const updatedSubjects = [...subjects];
        const updatedRegistedSub = [...registedSub];
        const course = updatedSubjects[index];
        const regisStartTime = new Date(database.Course.RegisTime.StartTime);
        const regisEndTime = new Date(database.Course.RegisTime.EndTime);
        const currentTime = new Date();
    
        if (currentTime >= regisStartTime && currentTime <= regisEndTime) {
            if (!course.IsRegist) {
                const confirmation = window.confirm('Bạn xác nhận đăng kí?');
                if (course.NumberStu >= 30) {
                    alert('Lớp đã quá số lượng thành viên');
                } else if (confirmation) {
                    // Kiểm tra xem môn học đã được đăng ký trên Firebase hay chưa
                    const db = getDatabase();
                    const Ref = ref(db, `CourseRegisted/${data.getID()}/${course.Subject}`);
                    get(Ref).then((snapshot) => {
                        if (snapshot.exists()) {
                            alert('Môn học này đã được đăng ký.');
                        } else {
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
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            } else {
                alert('Không thể đăng ký môn học do đã đăng kí, trùng tiết hoặc nằm ngoài thời gian đăng kí!');
            }
        } else {
            alert('Hiện tại không phải là thời gian đăng ký môn học.');
        }
    };

    useEffect(() => {
        const db = getDatabase();
        const Ref = ref(db, `CourseRegisted/${data.getID()}`);
        get(Ref).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const registedCourses = [];
                for (const subject in data) {
                    for (const group in data[subject]) {
                        const course = data[subject][group];
                        registedCourses.push({
                            CourseID: course.courseID,
                            Subject: course.Subject,
                            Group: group,
                            Credit: course.Credit,
                            NumberStu: course.NumberStu,
                            IsRegisted: course.IsRegisted,
                            IsDelete: false
                        });
                    }
                }
                setRegistedSub(registedCourses);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);


    const saveRegistationToFirebase = (subject) => {
        const db = getDatabase();
        const Ref = ref(db, `CourseRegisted/${data.getID()}/${subject.Subject}/${subject.Group}`);
        set(Ref, {
           courseID: subject.CourseID,
           Subject: subject.Subject,
           Credit: subject.Credit,
           Group: subject.Group,
           NumberStu: subject.NumberStu + 1, 
           IsRegisted: true
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
                    <p style={{fontStyle: 'italic'}}>Thời gian đăng kí: {regisTime}.</p>
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
