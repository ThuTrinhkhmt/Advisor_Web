import './GradeAppealStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment, useState } from 'react'
//Sửa thành có một danh sách phúc khảo trước
function Subject_Can_Appealed({ Subject }) {
    const [isAppeal, setIsAppeal] = useState(new Array(Subject.length).fill(false));
    const [selectedSub, setSelectedSub] = useState(new Array(Subject.length).fill(null));
    const [haveAtleastOne, setHaveAtleastOne] = useState(false);
    const confirmAppeal = (subject, index) => {
        if (isAppeal[index]) {
            alert('Môn học đã được chọn phúc tra!');
        } else {
            const confirmation = window.confirm('Bạn xác nhận phúc tra?');
            if (confirmation) {
                const infor = {
                    code: '#CM123',
                    courseID: subject.CourseID,
                    nameSub: subject.Subject,
                    state: 'Chưa xử lí'
                };
                const updatedIsAppeal = [...isAppeal];
                updatedIsAppeal[index] = true;
                setIsAppeal(updatedIsAppeal);

                const updatedSelectedSub = [...selectedSub];
                updatedSelectedSub[index] = infor;
                setSelectedSub(updatedSelectedSub);
                setHaveAtleastOne(true);
            }
        }
    };
    return (
        <div>
            <table>
                <thead>
                    <tr className='title1'>
                        <td className='shell'>Mã môn học</td>
                        <td className='shell'>Môn học</td>
                        <td className='shell'>Nhóm lớp</td>
                        <td className='shell'>Điểm</td>
                        <td>Xác nhận phúc tra</td>
                    </tr>
                </thead>
                <tbody>
                    {Subject.map((subject, index) => (
                        <tr key={index}>
                            <td>{subject.CourseID}</td>
                            <td>{subject.Subject}</td>
                            <td>{subject.Group}</td>
                            <td>{subject.Grade}</td>
                            <td className='Confirm'>
                                <button className="btn-appeal-stu" onClick={() => confirmAppeal(subject, index)}>Xác nhận phúc tra</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {haveAtleastOne && (
                <div>
                    <table>
                        <thead>
                            <tr className='title1'>
                                <td width='300px'>Mã phiếu phúc tra</td>
                                <td width='300px'>Ngày đăng ký</td>
                                <td width='300px'>Mã môn học</td>
                                <td width='300px'>Môn học</td>
                                <td width='300px'>Xác nhận của giảng viên</td>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSub.map((subject, index) => (
                                isAppeal[index] && (
                                    <tr key={index}>
                                        <td>{subject.code}</td>
                                        <td>15/07/2022</td>
                                        <td>{subject.courseID}</td>
                                        <td>{subject.nameSub}</td>
                                        <td>{subject.state}</td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}


function GradeAppealStu() {
    const Subject_can_appeal = [{
        CourseID: "CH1005",
        Subject: "Giải tích 1",
        Group: 'L04',
        Grade: '3',
    },
    {
        CourseID: "CH1006",
        Subject: "Giải tích 2",
        Group: 'L04',
        Grade: '5',
    },
    {
        CourseID: "CH1007",
        Subject: "Giải tích 3",
        Group: 'L04',
        Grade: '4',
    },
    ]
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id="GradeAppealStu1">
                <h1>Phúc tra điểm</h1>
                <div className='Infor1'>
                    <div className="Student_infor">
                        <p>Họ tên: Trần Văn A</p>
                        <p>Mssv: 112233</p>
                        <p>Ngành: KHMT</p>
                    </div>
                    <div className="Realtime_infor">
                        <p>Học kì: 223.</p>
                        <p>Thời gian phúc tra: 10/7/2022-20/7/2022.</p>
                    </div>
                </div>
                <div className="Appeal">
                    <div className='Infor2'>
                        <p>- Chỉ chấp nhận phúc tra bài tự luận.</p>
                        <p>- Phúc tra được thực hiện tại Khoa/ Bộ môn và giảng viên môn học.</p>
                        <p>- Kết quả phúc tra được cập nhật tại đây và bảng điểm(nếu có).</p>
                    </div>
                    <Subject_Can_Appealed Subject={Subject_can_appeal} />
                </div>

            </div>
            <Footer />
        </Fragment>
    )
}
export default GradeAppealStu
