import './InformationStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
import React, { useEffect, useState } from 'react';
import { PersonFactory } from '../../model/PersonFactory';
function InformationStu() {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const personRole = JSON.parse(localStorage.getItem('personRole'));
            const personID = JSON.parse(localStorage.getItem('personID'));
            alert(personID.id);
            const studentInfo = await PersonFactory.createPerson(personRole.role, personID.id);
            studentInfo.getName();
            //alert(studentInfo.getFaculity());
            const studentData = {
                name: "Le Cong Minh",
                studentID: studentInfo.getID(),
                dateOfBirth: studentInfo.getDateOfBirth(),
                gender: "Nu",
                faculty: "Khoa Học Máy Tính",
                address: "123 Đường ABC, Quận XYZ, Thành phố ABC"
            };
                setStudent(studentData);
        };

        fetchData();
    }, []);

    if (!student) {
        return <div>Loading...</div>;
    }

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
                        <strong>Ngày sinh:</strong> {}
                    </div>
                    <div className="col">
                    <strong>Giới tính:</strong> {student.gender}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>MSSV:</strong> {student.studentID}
                    </div>
                    <div className="col">
                        <strong>Khoa:</strong> {student.faculty}
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