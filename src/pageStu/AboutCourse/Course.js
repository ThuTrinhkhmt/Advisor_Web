import './Course.css';
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu';
import Footer from '../../components/ComponentStu/FooterStu/FooterStu';
import Nav from '../../components/ComponentStu/NavStu/NavStu';
import { Fragment, useState, useEffect } from 'react';
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { Link, useParams } from 'react-router-dom';
import { data } from '../../loginPage/Login_page';
import { Title } from 'chart.js';

function Process({ weeklyFeedback }) {
    return (
        <table className="Process">
            <tbody>
                {weeklyFeedback.map((week, index) => (
                    <tr className="Row" key={index}>
                        <td>
                            <p><strong>Tuần : </strong>{week.week}</p>
                            <p><strong>Nhận xét : </strong>{week.comment}</p>
                            <p><strong>Đánh giá : </strong>{week.score}</p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function Course() {
    let { courseID, group, teacher } = useParams();
    const [weeklyFeedback, setWeeklyFeedback] = useState([]);
    const [courseDescription, setCourseDescription] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
    const id = data.getID();
    const [detail, setDetail] = useState([
        { name: '', link: ''},
        { name: '', link: ''}
    ]);
    
    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, `Course/${courseID}/Group/${group}/Student`);
        const descRef = ref(db, `Course/${courseID}/Group/${group}/AboutCourse/Description`);
        const docRef = ref(db, `Course/${courseID}/Group/${group}/AboutCourse/Document`);
        const titlRef = ref(db, `Course/${courseID}/Group/${group}/AboutCourse/Title`);
        get(docRef).then((snapshot) => {
            if (snapshot.exists()) {
                const documents = snapshot.val();
                const details = documents.map(doc => ({
                    name: doc.name,
                    link: doc.url
                }));
                setDetail(details);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error("Error getting documents:", error);
        });
        
        get(descRef).then((snapshot) => {
            setCourseDescription(snapshot.val());
        }).catch((error) => {
            console.error("Error getting course description:", error);
        });
        get(titlRef).then((snapshot) => {
            setCourseTitle(snapshot.val());
        }).catch((error) => {
            console.error("Error getting course description:", error);
        });

        get(dbRef).then((snapshot) => {
            const stu = snapshot.val();
            if (stu && stu[id] && stu[id].Week) {
                const feedback = Object.keys(stu[id].Week).map(week => ({
                    week: week,
                    comment: stu[id].Week[week].comment,
                    score: stu[id].Week[week].score
                }));
                setWeeklyFeedback(feedback);
            }
        }).catch((error) => {
            console.error("Error getting student feedback:", error);
        });
    }, [courseID, group, id]);

    const object = {
        teacher: teacher,
        nameSub: courseID,
        group: group,
    };

    const [showCourses, setShowCourses] = useState(true);

    const toggleDisplay1 = () => {
        setShowCourses(true);
    };
    const toggleDisplay2 = () => {
        setShowCourses(false);
    };

    return (
        <Fragment>
            <Header />
            <Nav />
            <div id="AboutCourse">
                <h1 className='header'> {object.nameSub} - nhóm {object.group} - GV {object.teacher} </h1>
                <div className='buttons'>
                    <button onClick={toggleDisplay1}>Khóa học</button>
                    <button className='Process' onClick={toggleDisplay2}>Tiến trình học tập</button>
                </div>
                {
                    showCourses ? (
                        <div className='CourseView'>
                            <div className='Descript'>
                                <h2>{courseTitle}</h2>
                                <p>{courseDescription}</p>
                            </div>
                            <div className='Detail'>
                                <h2>Tài liệu học tập</h2>
                                {
                                    detail.map((obj, index) => (
                                        <ul key={index}>
                                            <p>Sử dụng đường link sau đây để mở tài nguyên: <Link to={obj.link}>{obj.name}</Link></p>
                                        </ul>
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        <div className='Process'>
                            <Process weeklyFeedback={weeklyFeedback} />
                        </div>
                    )
                }
            </div>
            <Footer />
        </Fragment>
    );
}

export default Course;
