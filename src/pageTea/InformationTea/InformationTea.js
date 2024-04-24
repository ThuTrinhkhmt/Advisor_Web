import React, { Fragment, useState, useEffect, useRef } from 'react';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './InformationTea.css';

import { Account } from '../../model/Account';
import { PersonFactory } from '../../model/PersonFactory';
const role = localStorage.getItem('role');
const username = localStorage.getItem('username');
const account = new Account(role, username);
await account.loadFromDatabase();
const teacherData = await PersonFactory.createPerson('Teacher', username);
await teacherData.loadFromDatabase();
teacherData.setAccount(account);
function InformationTea() {
    const preTeacher = useRef(null);
    const [editable, setEditable] = useState(false);
    //Hai biến này của tớ

    //Này là từ giáo viên cậu tự lấy thông tin giáo viên và lưu vô biến teacher cho tớ nha, ở chổ useState á
    
    //const storedTeacherData = JSON.parse(localStorage.getItem('teacher'));
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
    useEffect(() => {
        const loadTeacher = async () => {
            setTeacher({
                name: teacherData.getName(),
                dateOfBirth: teacherData.getDateOfBirth(),
                gender: teacherData.getGender(),
                faculity: teacherData.getFaculity(),
                address: teacherData.getAddress(),
                specialize: teacherData.getSpecialize(),
                degree: teacherData.getDegree(),
                position: teacherData.getPosition()
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
                        {editable ? 
                            <input type="text" name="name" className="input-name" value={teacher.name} onChange={handleInputChange} /> 
                            : teacher.name}
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
                        {editable ? 
                            <input type="text" name="degree" className="input-degree" value={teacher.degree} onChange={handleInputChange} /> 
                            : teacher.degree}
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <strong>Chức vụ: </strong> 
                        {editable ? 
                            <input typ="text" name="position" className="input-position" value={teacher.position} onChange={handleInputChange} /> 
                            : teacher.position}
                    </div>
                    <div className="col-2">
                        <strong>Khoa: </strong> 
                        {editable ? 
                            <input type="text" name="faculity" className="input-faculity" value={teacher.faculity} onChange={handleInputChange} /> 
                            : teacher.faculity}
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
