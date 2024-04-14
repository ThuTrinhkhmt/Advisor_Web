import React, { Fragment, useState, useRef } from 'react';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './InformationTea.css';

function InformationTea() {
    const preTeacher = useRef(null);
    const [editable, setEditable] = useState(false);
    const [teacher, setTeacher] = useState({
        name: "Nguyễn Văn A",
        dateOfBirth: "01/01/1990",
        gender: "Nam",
        faculty: "Khoa Học Máy Tính",
        address: "123 Đường ABC, Quận XYZ, Thành phố ABC",
        specialization: "Lập trình web",
        degree: "Tiến sĩ",
        position: "Giáo sư"
    });

    const handleEdit = () => {
        preTeacher.current = { ...teacher };
        setEditable(true);
    };

    const handleSave = () => {
        setEditable(false);
    };

    const handleCancel = () => {
        setEditable(false);
        setTeacher(preTeacher.current); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeacher({ ...teacher, [name]: value });
    };

    return (
        <Fragment>
            <Header />
            <Nav key="Nav" />
            <div id="InformationPage">
                <h1>Thông Tin Giảng Viên</h1>
                <div className="img-contain">
                    <img src="../../../img/avt.jpg" alt="Avatar" />
                    <p>
                        {editable ? 
                            <input type="text" name="name" className="input-name" value={teacher.name} onChange={handleInputChange} /> 
                            : teacher.name}
                    </p>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Ngày sinh: </strong> 
                        {editable ? 
                            <input type="text" name="dateOfBirth" className="input-date" value={teacher.dateOfBirth} onChange={handleInputChange} /> 
                            : teacher.dateOfBirth}
                    </div>
                    <div className="col">
                        <strong>Giới tính: </strong> 
                        {editable ? 
                            <input type="text" name="gender" className="input-gender" value={teacher.gender} onChange={handleInputChange} /> 
                            : teacher.gender}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Chuyên môn: </strong> 
                        {editable ? 
                            <input type="text" name="specialization" className="input-specialization" value={teacher.specialization} onChange={handleInputChange} /> 
                            : teacher.specialization}
                    </div>
                    <div className="col">
                        <strong>Bằng cấp: </strong> 
                        {editable ? 
                            <input type="text" name="degree" className="input-degree" value={teacher.degree} onChange={handleInputChange} /> 
                            : teacher.degree}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Chức vụ: </strong> 
                        {editable ? 
                            <input type="text" name="position" className="input-position" value={teacher.position} onChange={handleInputChange} /> 
                            : teacher.position}
                    </div>
                    <div className="col">
                        <strong>Khoa: </strong> 
                        {editable ? 
                            <input type="text" name="faculty" className="input-faculty" value={teacher.faculty} onChange={handleInputChange} /> 
                            : teacher.faculty}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Địa chỉ: </strong> 
                        {editable ? 
                            <input type="text" name="address" className="input-address" value={teacher.address} onChange={handleInputChange} /> 
                            : teacher.address}
                    </div>
                </div>
                <div className="button-container">
                    {editable ? (
                        <Fragment>
                            <button className="btn-save" onClick={handleSave}>Lưu</button>
                            <button className="btn-cancel" onClick={handleCancel}>Hủy</button>
                        </Fragment>
                    ) : (
                        <button className="btn-editer" onClick={handleEdit}>Chỉnh sửa</button>
                    )}
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default InformationTea;
