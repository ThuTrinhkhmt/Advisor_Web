import './InformationStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
import { PersonFactory } from '../../model/PersonFactory';
function InformationStu() {
    const student1 = {
        name: "Nguyễn Văn A",
        studentID: "SV001",
        dateOfBirth: "01/01/1990",
        gender: "Nam",
        faculty: "Khoa Học Máy Tính",
        address: "123 Đường ABC, Quận XYZ, Thành phố ABC"
    };
    const student= PersonFactory.createPerson('STUDENT');
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "InformationPage">
            <h1>Thông Tin Sinh Viên</h1>
                <div className = "img-contain">
                    <img src="../../../img/avt.jpg" alt="Avatar" />
                    <p>{student.name}</p>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Ngày sinh:</strong> {student.getDateOfBirth()}
                    </div>
                    <div className="col">
                    <strong>Giới tính:</strong> {student.getGender()}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>MSSV:</strong> {student.getStudentID()}
                    </div>
                    <div className="col">
                        <strong>Khoa:</strong> {student.getFaculity()}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Địa chỉ:</strong> {student.address}
                    </div>
                </div>
            </div>
        <Footer />
        </Fragment>
    )
}

export default InformationStu