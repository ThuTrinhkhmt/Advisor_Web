import './CourseRegistationStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment, useState, useRef } from 'react'


//Nhận vào môn học đã đăng ký và những môn học tìm kiếm
function CourseRegistationStu() {
    const Groups={starttime:'01/01/2022', endtime:'15/05/2022'}
    const semester = '223';
    const [registedSub, setRegistedSub]= useState([{
        CourseID: "MT1003",
        Subject: "Giải tích 1",
        Group: "L04",
        Credit: "4",
        NumberStu: "20/30",
        IsDelete: false
    },
    {
        CourseID: "MT1005",
        Subject: "Giải tích 2",
        Group: "L05",
        Credit: "4",
        NumberStu: "25/30",
        IsDelete: false
    },
    {
        CourseID: "CO2011",
        Subject: "Mô hình hóa",
        Group: "L17",
        Credit: "4",
        NumberStu: "2/30",
        IsDelete: false
    }
    ])
    const [Subjects, setSubjects] = useState([
        {
            CourseID: "MT1003",
            Subject: "Hóa ",
            Group: "L04",
            Credit: "4",
            NumberStu: "20/30",
            Day: ['Thứ 2: Tiết 1, 2', 'Thứ 3: Tiết 3, 4'],
            IsRegist: false
        },
        {
            CourseID: "MT1005",
            Subject: "Lí",
            Group: "L05",
            Credit: "4",
            NumberStu: "25/30",
            Day: ['Thứ 2: Tiết 1, 2', 'Thứ 3: Tiết 3, 4'],
            IsRegist: false
        },
        {
            CourseID: "CO2011",
            Subject: "Sinh",
            Group: "L17",
            Credit: "4",
            NumberStu: "2/30",
            Day: ['Thứ 2: Tiết 1, 2', 'T    hứ 3: Tiết 3, 4'],
            IsRegist: false
        }
    ]);

    const [FindSub, setFindSub] = useState('');

    const handleFindSub = () => {
        setFindSub(document.getElementById("Inputsubject").value);
    };

    const confirmDelete = (index) => {
        const updatedregistedSub = [...registedSub];
        const course = updatedregistedSub[index];

        if (!course.IsDelete) {
            const confirmation = window.confirm('Bạn xác nhận hủy môn?');
            if (confirmation) {
                course.IsDelete = true;
                setRegistedSub(updatedregistedSub);
                alert('Hủy môn thành công.');
            }
        } 
    };
    const confirmRegist = (index) => {
        const updatedSubjects = [...Subjects];
        const updatedRegistedSub = [...registedSub];
        const course = updatedSubjects[index];

        if (!course.IsRegist) {
            const confirmation = window.confirm('Bạn xác nhận đăng kí?');
            if (confirmation) {
                course.IsRegist = true;
                setSubjects(updatedSubjects);
               
                const obj={
                    CourseID: course.CourseID,
                    Subject: course.Subject,
                    Group: course.Group,
                    Credit: course.Credit,
                    NumberStu: course.NumberStu,
                    IsDelete: false}
                    updatedRegistedSub.push(obj);
                    setRegistedSub(updatedRegistedSub);
                }
                alert('Đăng kí thành công.');
        } else {
            alert('Không thể đăng ký môn học do đã đăng kí, trùng tiết hoặc nằm ngoài thời gian đăng kí!');
        }
    };
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id="CourseRegistationStu1">
                <h1>Đăng kí khóa học</h1>
                <div className='Infor'>
                    <p>Học kì: {semester}.</p>
                    <p style={{ fontStyle: 'italic' }}>Thời gian đăng kí: {Groups.starttime} - {Groups.endtime}.</p>
                    <p className = "red">Sinh viên cần nhập đúng tên môn học hoặc mã môn.</p>
                    <p className = "red">Các thao tác ngoài thời gian đăng kí môn sẽ không được chấp nhận.</p>
                </div>

                <div className="head">
                    <input id="Inputsubject" placeholder="Insert name subject or code"></input>
                    <button> Find </button>
                </div>
                {
                    FindSub !== '' && Subjects.length > 0 && (
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
                                        <td>Tiết</td>
                                        <td>Đăng kí</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Subjects.map((course, index) => (
                                            <tr key={index}>
                                                <td>{course.CourseID}</td>
                                                <td>{course.Subject}</td>
                                                <td>{course.Credit}</td>
                                                <td>{course.Group}</td>
                                                <td>{course.NumberStu}</td>
                                                <td>
                                                    {course.Day.map((day, index) => (
                                                        <p key={index}>{day}<br /></p>
                                                    ))}
                                                </td>
                                                <td>
                                                    <button className='confirm' onClick={() => confirmRegist(index)}>
                                                        Đăng kí
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
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
                            <td >Đăng kí hủy môn</td>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            registedSub.map((course, index) => ( 
                                (!course.IsDelete) && (<tr key={index}>
                                    <td>{course.CourseID}</td>
                                    <td>{course.Subject}</td>
                                    <td>{course.Credit}</td>
                                    <td>{course.Group}</td>
                                    <td>{course.NumberStu}</td>
                                    <td>
                                        <button className='confirm'onClick={()=> confirmDelete(index)}>
                                            Đăng kí hủy môn
                                        </button>
                                    </td>
                                </tr>)
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Footer />
        </Fragment>
    )
}
export default CourseRegistationStu
