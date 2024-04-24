import './InformationStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
import React, { useEffect, useState, useRef } from 'react';
import {role, username} from '../../loginPage/Login_page'
import { PersonFactory } from '../../model/PersonFactory';
import { Account } from '../../model/Account';
function InformationStu() {
    const [account, setAccount] = useState(null);
    useEffect(() => {
        const loadAccount = async () => {
          const acc = new Account(role, username);
          await acc.loadFromDatabase();
          setAccount(acc);
        };
        loadAccount();
      }, []);

    const preStudent = useRef(null);
    const [editable, setEditable] = useState(false);
    const [student, setStudent] = useState({
        name: "Nguyễn Văn A",
        studentID: "SV001",
        dateOfBirth: "01/01/1990",
        gender: "Nam",
        faculty: "Khoa Học Máy Tính",
        address: "123 Đường ABC, Quận XYZ, Thành phố ABC"
    });
    const handleEdit = () => {
        preStudent.current = { ...student };
        setEditable(true);
    };

    const handleSave = () => {
        setEditable(false);
    };

    const handleCancel = () => {
        setEditable(false);
        setStudent(preStudent.current); 
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value });
    };
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "InformationPage1">
            <h1>Thông Tin Sinh Viên</h1>
                <div className = "img-contain">
                    <img src="../../../img/avt.jpg" alt="Avatar" />
                    <p>{}</p>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Ngày sinh:</strong> 
                        {editable ? 
                            <input type="text" name="dateOfBirth" className="input-birthday" value={student.dateOfBirth} onChange={handleInputChange} /> 
                            : student.dateOfBirth}
                    </div>
                    <div className="col">
                    <strong>Giới tính:</strong> 
                    {editable ? 
                            <input type="text" name="gender" className="input-gender" value={student.gender} onChange={handleInputChange} /> 
                            : student.gender}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>MSSV:</strong> {}
                    </div>
                    <div className="col">
                        <strong>Khoa:</strong> {}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Địa chỉ:</strong> 
                        {editable ? 
                            <input type="text" name="address" className="input-address" value={student.address} onChange={handleInputChange} /> 
                            : student.address}
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
    )
}

export default InformationStu
