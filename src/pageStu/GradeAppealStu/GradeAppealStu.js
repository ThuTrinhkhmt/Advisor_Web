import './GradeAppealStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
function GradeAppealStu() {

    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "GradeAppealStu1">
                <h1>Phúc tra điểm</h1>
                <div className='Infor'>
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
                    
                    <ul>
                        <li>- Chỉ chấp nhận phúc tra bài tự luận.</li>
                        <li>- Phúc tra được thực hiện tại Khoa/ Bộ môn và giảng viên môn học.</li>
                        <li>- Kết quả phúc tra được cập nhật tại đây và bảng điểm(nếu có).</li>
                    </ul>
                    <table>
                        <tr>
                            <td className='shell'>Mã môn học</td>
                            <td className='shell'>Môn học</td>
                            <td className='shell'>Nhóm lớp</td>
                            <td className='shell'>Điểm</td>
                            <td>Xác nhận phúc tra</td>
                        </tr>  
                        <tr>
                            <td>CH1005</td>
                            <td>Giải thích 2</td>
                            <td>L04</td>
                            <td>3.0</td>
                            <td className='Confirm'>
                                <button className = "btn-appeal-stu">Xác nhận phúc tra</button>
                            </td>
                            
                        </tr>  
                    </table>
                  
                    <table>
                        <tr>
                            <td width='300px'>Mã phiếu phúc tra</td>
                            <td width='300px'>Ngày đăng ký</td>
                            <td width='300px'>Xác nhận của PDT</td>
                            <td>Kết quả</td>
                        </tr>
                        <tr>
                            <td>#cvbnm</td>
                            <td>15/07/2022</td>
                            <td>
                                Đã xác nhận
                            </td>
                            <td>Kq</td>
                        </tr>
                    </table>
                </div>
                
            </div>
        <Footer />
        </Fragment>
    )
}

export default GradeAppealStu
