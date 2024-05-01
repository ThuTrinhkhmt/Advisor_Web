import './Course.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment, useState } from 'react'
import {Link} from 'react-router-dom';
function Process({weeklyFeedback}){
    return (
        <table className="Process">
            <tbody>
                {weeklyFeedback.map((week, index) => (
                    <tr className="Row" key={index}>
                        <td>
                            <p><strong>Tuần : </strong>{week.week}</p>
                            <p><strong>Nhận xét : </strong>{week.comment}</p>
                            <p><strong>Đánh giá : </strong>{week.rating}</p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
function Course() {
    const object={
        teacher: 'Trần Văn B',
        nameSub: 'Giải tích 1',
        group: 'L04',
        weeklyFeedback: [
            { week: 1, comment: "Tuần đầu tiên, mọi thứ vẫn diễn ra suôn sẻ.", rating: 4 },
            { week: 2, comment: "Tuần này có một số khó khăn nhưng vẫn hoàn thành được nhiệm vụ.", rating: 5 },
            { week: 3, comment: "Cần cải thiện việc quản lý thời gian trong tuần này.", rating: 4 },
            { week: 4, comment: "Tuần này đã đạt được mục tiêu đề ra.", rating: 1 },
            { week: 5, comment: "Thành công trong việc giải quyết các vấn đề phát sinh.", rating: 4 },
            { week: 6, comment: "Cần tăng cường giao tiếp và hợp tác trong nhóm.", rating: 2 },
            { week: 7, comment: "Tuần này có nhiều áp lực nhưng vẫn giữ vững được sự kiên nhẫn.", rating: 5 },
            { week: 8, comment: "Cảm thấy mệt mỏi nhưng vẫn tiếp tục phấn đấu.", rating: 3 },
            { week: 9, comment: "Cần thêm sự tổ chức trong lịch làm việc của mình.", rating: 0 },
            { week: 10, comment: "Hoàn thành mọi nhiệm vụ một cách xuất sắc.", rating: 2 }
        ]

    }
    const CourseDescription=useState('Môn học giúp sinh viên phát triển tư duy logic, phương pháp suy luận đồng thời trang bị lượng kiến thức cơ sở quan trọng giúp sinh viên các ngành kỹ thuật và công nghệ học tốt các môn toán chuyên đề và các môn học chuyên ngành sau này.')
    const detail=
        [
            {link: 'https://www.facebook.com',
            descript:'Ôn cuối kì'}, 
            {link: 'https://www.youtube.com',
            descript:'Slide'}
        ]
    ;
    
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
            <div id = "AboutCourse">
                <h1 className='header'> {object.nameSub} - nhóm {object.group} - GV {object.teacher} </h1>
                <div className='buttons'>
                    <button  onClick={toggleDisplay1}>Khóa học</button>
                    <button className='Process' onClick={toggleDisplay2}>Tiến trình học tập</button>
                </div> 
                {
                    showCourses ? (
                        <div className='CourseView'>
                            <div className='Descript'>
                                <h2>Mô tả môn học</h2>
                                <p>{CourseDescription}</p>
                            </div>
                            <div className='Detail'>
                                <h2>Tài liệu học tập</h2>
                                {
                                    detail.map((obj, index) => (
                                        <ul key={index}>
                                            <p>Sử dụng đường link sau đây để mở tài nguyên: <Link to={obj.link}>{obj.descript}</Link></p>


                                        </ul>
                                    ))
                                }
                            </div>

                        </div >) : (
                        <div className='Process'>
                            <Process weeklyFeedback={object.weeklyFeedback} />
                        </div>
                    )
                }                    
            </div>
        <Footer />
        </Fragment>
    )
}

export default Course
