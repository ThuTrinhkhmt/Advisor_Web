import React, { Fragment, useState, useEffect, useRef } from 'react';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './InformationTea.css';

import { data } from '../../loginPage/Login_page';
//import { PersonFactory } from '../../model/PersonFactory';
function InformationTea() {
    const preTeacher = useRef(null);
    const [editable, setEditable] = useState(false);
    //Hai biến này của tớ

    //Này là từ giáo viên cậu tự lấy thông tin giáo viên và lưu vô biến teacher cho tớ nha, ở chổ useState á
    const [teacher, setTeacher] = useState({
        name: "",
        dateOfBirth: "",
        gender: "",
        faculity: "",
        address: "",
        specialize: "",
        degree: "",
        position: ""
    });
    const [teacherData, setTeacherData] = useState(null);
    useEffect(() => {
        const loadTeacher = async () => {
            setTeacherData(data);
            setTeacher({
                name: data.getName(),
                dateOfBirth: data.getDateOfBirth(),
                gender: data.getGender(),
                faculity: data.getFaculity(),
                address: data.getAddress(),
                specialize: data.getSpecialize(),
                degree: data.getDegree(),
                position: data.getPosition()
            });
        };
        loadTeacher();
    }, []);
    const handleEdit = () => {
        preTeacher.current = { ...teacher };
        setEditable(true);
    };

    const handleSave = async () => {
        const fieldsToUpdate = ['name', 'dateOfBirth', 'gender', 'faculity', 'address', 'specialize', 'degree', 'position'];
        for (const field of fieldsToUpdate) {
            if (teacher[field] !== preTeacher.current[field]) {
                await teacherData[`set${field.charAt(0).toUpperCase() + field.slice(1)}`](teacher[field]);
            }
        }
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
            <div id="InformationPage2">
                <h1>Thông Tin Giảng Viên</h1>
                <div className="img-contain">
                    <img src="../../../img/avt.jpg" alt="Avatar" />
                    <p>
                        {teacher.name}
                    </p>
                </div>
                <div className="row">
                    <div className="col-2">
                        <strong>Ngày sinh: </strong> 
                        {editable ? 
                            <input type="text" name="dateOfBirth" className="input-date" value={teacher.dateOfBirth} onChange={handleInputChange} /> 
                            : teacher.dateOfBirth}
                    </div>
                    <div className="col-2">
                        <strong>Giới tính: </strong> 
                        {editable ? 
                            <input type="text" name="gender" className="input-gender" value={teacher.gender} onChange={handleInputChange} /> 
                            : teacher.gender}
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <strong>Chuyên môn: </strong> 
                        {editable ? 
                            <input type="text" name="specialize" className="input-specialize" value={teacher.specialize} onChange={handleInputChange} /> 
                            : teacher.specialize}
                    </div>
                    <div className="col-2">
                        <strong>Bằng cấp: </strong> 
                        {teacher.degree}
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <strong>Chức vụ: </strong> 
                        {teacher.position}
                    </div>
                    <div className="col-2">
                        <strong>Khoa: </strong> 
                        {teacher.faculity}
                    </div>
                </div>
                <div className="row">
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