import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './ClassGrade.css';
import { data } from '../../loginPage/Login_page';
function ClassGrade() {
    let { courseID, group } = useParams();
    const groupData=data.getAGroup(courseID, group);
    //Từ courseID và group (này là mã môn và nhóm lớp), cậu tìm danh sách sinh viên trong lớp đó cho tớ
    //Cậu lấy class students rồi quăng vô chổ students cho tớ á, quăng ở chổ useState(trong này nè), tớ nghĩ thế
    const [students, setStudents] = useState([
        {
            name: "John Doe",
            studentID: "001",
            componentScore: "KT:8 BTL:7 TN:8.5",
            examScore: 7.5,
            totalScore: 9.0,
            isEditing: false,
            isEdited: 0
        }
    ]);
    useEffect(() => {
        const loadGroup = async () => {
          const arrayStu= groupData.getStudents();
          if (arrayStu && arrayStu.length > 0) {
            setStudents(arrayStu.map((stu) => ({
              name: stu.getName(),
              studentID: stu.getID(),
              componentScore: "KT:8 BTL:7 TN:8.5",
              examScore: 7.5,
              totalScore: 9.0,
              isEditing: false,
              isEdited: 0
            })));
          }
        };
        loadGroup();
    }, []);
    const prevStudents = useRef([...students]);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    //Mấy tham số này là của tớ riêng
    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const updatedStudents = [...students];
        updatedStudents[index][name] = value;
        setStudents(updatedStudents);
        setUnsavedChanges(true);
    };

    const handleEditScore = (index) => {
        prevStudents.current = [...students]; // Lưu trạng thái trước khi chỉnh sửa
        const updatedStudents = [...students];
        updatedStudents[index] = {
            ...updatedStudents[index],
            isEditing: true
        };
        setStudents(updatedStudents);
        setUnsavedChanges(true);
        setEditMode(true);
        setEditingIndex(index);
    };
    
    const handleSaveScore = (index) => {
        if (window.confirm("Bạn có muốn cập nhật điểm không?")) {
            const updatedStudents = [...students];
            updatedStudents[index].isEditing = false;
            updatedStudents[index].isEdited++;
            setStudents(updatedStudents);
            setUnsavedChanges(false);
        } else {
            setStudents([...prevStudents.current]); // Khôi phục lại trạng thái trước khi chỉnh sửa
            setUnsavedChanges(false);
        }
        setEditMode(false);
    };

    const handleBlur = (index) => {
        if (window.confirm("Bạn có muốn cập nhật điểm không?")) {
            const updatedStudents = [...students];
            updatedStudents[index].isEditing = false;
            updatedStudents[index].isEdited++;
            setStudents(updatedStudents);
            setUnsavedChanges(false);
        } else {
            setStudents([...prevStudents.current]);
            setUnsavedChanges(false);
        }
        setEditMode(false);
    };

    return (
        <>
            <Header />
            <Nav key='Nav' />
            <div className="pageGradeClass2">
                <h1>Bảng điểm môn {courseID} lớp {group}</h1>
                <table>
                    <thead>
                        <tr>
                            <th className="color-draw centerTable">STT</th>
                            <th className="color-draw centerTable">Tên</th>
                            <th className="color-draw centerTable">MSSV</th>
                            <th className="color-draw centerTable">Điểm thành phần</th>
                            <th className="color-draw centerTable">Điểm thi</th>
                            <th className="color-draw centerTable">Điểm tổng kết</th>
                            <th className="color-draw centerTable">Sửa Điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className={`centerTable ${student.isEdited >= 2 ? 'edited' : ''}`}>
                                        {index + 1}</td>
                                <td className={`${student.isEdited >= 2 ? 'edited' : ''}`}>
                                    <Link to={`/course/${courseID}/${group}/${student.studentID}`}>
                                        {student.name}</Link>
                                </td>
                                <td className={`centerTable ${student.isEdited >= 2 ? 'edited' : ''}`}>
                                    {student.studentID}</td>
                                <td
                                    className={`${student.isEdited >= 2 ? 'edited' : ''}`}
                                >
                                    {student.isEditing && editMode && editingIndex === index ? (
                                        <input
                                            className='input-update1'  
                                            type="text"
                                            name="componentScore"
                                            value={student.componentScore}
                                            onChange={(event) => handleChange(event, index)}
                                            onBlur={() => handleBlur(index)}
                                        />
                                    ) : (
                                        student.componentScore
                                    )}
                                </td>
                                <td
                                    className={`centerTable ${
                                        student.isEdited >= 2 ? 'edited' : ''
                                    }`}
                                >
                                    {student.isEditing && editMode && editingIndex === index ? (
                                        <input
                                            className='input-update'
                                            type="text"
                                            name="examScore"
                                            value={student.examScore}
                                            onChange={(event) => handleChange(event, index)}
                                            onBlur={() => handleBlur(index)}
                                        />
                                    ) : (
                                        student.examScore
                                    )}
                                </td>
                                <td
                                    className={`centerTable ${
                                        student.isEdited >= 2 ? 'edited' : ''
                                    }`}
                                >
                                    {student.isEditing && editMode && editingIndex === index ? (
                                        <input
                                            type="text"
                                            className='input-update'
                                            name="totalScore"
                                            value={student.totalScore}
                                            onChange={(event) => handleChange(event, index)}
                                            onBlur={() => handleBlur(index)}
                                        />
                                    ) : (
                                        student.totalScore
                                    )}
                                </td>
                                <td className={`centerTable hover-btn ${student.isEdited >= 2 ? 'edited' : ''}`}>
                                    {student.isEditing && editMode && editingIndex === index ? (
                                        <div className="edit-button" onClick={() => handleSaveScore(index)}>O</div>
                                    ) : (
                                        <div className="edit-button" onClick={() => handleEditScore(index)}>X</div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default ClassGrade;
