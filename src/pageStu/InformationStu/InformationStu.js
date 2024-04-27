import './InformationStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
import React, { useEffect, useState, useRef } from 'react';
import { PersonFactory } from '../../model/PersonFactory';
import { Account } from '../../model/Account';
import { data } from '../../loginPage/Login_page';
function InformationStu() {
    const preStudent = useRef(null);
    const [editable, setEditable] = useState(false);
    //Hai biến này của tớ

    //Này là từ giáo viên cậu tự lấy thông tin giáo viên và lưu vô biến teacher cho tớ nha, ở chổ useState á
    const [student, setStudent] = useState({
        id: "",
        name: "",
        dateOfBirth: "",
        gender: "",
        faculity: "",
        address: ""
    });
    const [studentData, setStudentData] = useState(null);
    useEffect(() => {
        const loadStudent = async () => {
            setStudentData(data);
            setStudent({
                id: data.getID(),
                name: data.getName(),
                dateOfBirth: data.getDateOfBirth(),
                gender: data.getGender(),
                faculity: data.getFaculity(),
                address: data.getAddress()
            });
        };
        loadStudent();
    }, []);
    const handleEdit = () => {
        preStudent.current = { ...student };
        setEditable(true);
    };

    const handleSave = async () => {
        const fieldsToUpdate = ['id', 'name', 'dateOfBirth', 'gender', 'faculity', 'address'];

        for (const field of fieldsToUpdate) {
            if (student[field] !== preStudent.current[field]) {
                await studentData[`set${field.charAt(0).toUpperCase() + field.slice(1)}`](student[field]);
            }
        }
        setEditable(false);
    };

    const handleCancel = () => {
        setEditable(false);
        setStudent(preStudent.current); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
                    <p>{student.name}</p>
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
                        <strong>MSSV:</strong> {student.id}
                    </div>
                    <div className="col">
                        <strong>Khoa:</strong> {student.faculity}
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
