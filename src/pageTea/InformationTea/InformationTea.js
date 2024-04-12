import './InformationTea.css'
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea'
import Footer from '../../components/ComponentTea/FooterTea/FooterTea'
import Nav from '../../components/ComponentTea/NavTea/NavTea'
import { Fragment } from 'react'

function InformationTea() {
    const teacher = {
        name: "Nguyễn Văn A",
        dateOfBirth: "01/01/1990",
        gender: "Nam",
        faculty: "Khoa Học Máy Tính",
        address: "123 Đường ABC, Quận XYZ, Thành phố ABC",
        specialization: "Lập trình web",
        degree: "Tiến sĩ",
        position: "Giáo sư"
    };

    return (
        <Fragment>
            <Header />
            <Nav key = 'Nav'/>
            <div id="InformationPage">
                <h1>Thông Tin Giảng Viên</h1>
                <div className="img-contain">
                    <img src="../../../img/avt.jpg" alt="Avatar" />
                    <p>{teacher.name}</p>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Ngày sinh:</strong> {teacher.dateOfBirth}
                    </div>
                    <div className="col">
                    <strong>Giới tính: </strong>{teacher.gender}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Chuyên môn:</strong> {teacher.specialization}
                    </div>
                    <div className="col">
                        <strong>Bằng cấp:</strong> {teacher.degree}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Chức vụ:</strong> {teacher.position}
                    </div>
                    <div className="col">
                        <strong>Khoa:</strong> {teacher.faculty}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Địa chỉ:</strong> {teacher.address}
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default InformationTea
