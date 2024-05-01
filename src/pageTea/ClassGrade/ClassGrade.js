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
    const arrayStu= groupData.getStudents();
    //Từ courseID và group (này là mã môn và nhóm lớp), cậu tìm danh sách sinh viên trong lớp đó cho tớ
    //Cậu lấy class students rồi quăng vô chổ students cho tớ á, quăng ở chổ useState(trong này nè), tớ nghĩ thế
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const loadGroup = async () => {
          if (arrayStu && arrayStu.length > 0) {
            setStudents(arrayStu.map((stu) => ({
              name: stu.getName(),
              studentID: stu.getID(),
              componentScore: stu.getStudentScore(courseID).getComponentScore(),
              examScore: stu.getStudentScore(courseID).getFinalScore(),
              totalScore: stu.getStudentScore(courseID).getAverScore(),
              isEditing: stu.getStudentScore(courseID).getIsEditing(),
              isEdited: stu.getStudentScore(courseID).getIsEdited()
            })));
          }
        };
        loadGroup();
    }, [courseID, groupData, arrayStu]);
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
    
    const handleSaveScore = async (index) => {
        if (window.confirm("Bạn có muốn cập nhật điểm không?")) {
            const updatedStudents = [...students];
            updatedStudents[index].isEditing = false;
            setUnsavedChanges(false);
            const fieldsToUpdate = ['componentScore', 'examScore','totalScore'];
            let changedFieldsCount = 0;
            // Lặp qua các trường cần cập nhật
            fieldsToUpdate.forEach(field => {
            // Kiểm tra nếu giá trị đã thay đổi
            if (students[index][field] !== prevStudents.current[index][field]) {
                changedFieldsCount++; // Tăng biến đếm nếu có thay đổi
            }
            });
            if(changedFieldsCount===3) {
                await arrayStu[index].setScore(courseID, updatedStudents[index]['componentScore'], 
                updatedStudents[index]['examScore'], updatedStudents[index]['totalScore']);
                const now = new Date();
                const futureDate = new Date(now);
                futureDate.setDate(now.getDate() + 30);
                groupData.setStartDay(now);
                groupData.setEndDay(futureDate);
                const day = now.getDate(); // Ngày trong tháng (1-31)
                const month = now.getMonth() + 1; // Tháng (0-11), cần cộng thêm 1 để được từ 1-12
                const year = now.getFullYear(); // Năm
                alert(`Ngày bắt đầu mở phúc khảo: ${day}/${month}/${year}`);
                const day1 = futureDate.getDate(); // Ngày trong tháng
                const month1 = futureDate.getMonth() + 1; // Tháng (cần cộng thêm 1)
                const year1 = futureDate.getFullYear(); // Năm
                alert(`Ngày kết thúc phúc khảo: ${day1}/${month1}/${year1}`);
                const formattedDate = now.toLocaleDateString();
                const formattedDate2 = futureDate.toLocaleDateString();
                arrayStu[index].setDay(courseID, formattedDate, formattedDate2);
            }else{
                for (const field of fieldsToUpdate) {
                    if (updatedStudents[index][field] !== prevStudents.current[index][field]) {
                        if(field==='componentScore') await arrayStu[index].setComponentScore(courseID, updatedStudents[index]['componentScore']);
                        else if(field==='examScore') await arrayStu[index].setExamScore(courseID, updatedStudents[index]['examScore']);
                        else await arrayStu[index].setTotalScore(courseID, updatedStudents[index]['totalScore']);
                    }
                }
            }
            updatedStudents[index].isEdited=arrayStu[index].getStudentScore(courseID).getIsEdited();
            setStudents(updatedStudents);
        } else {
            setStudents([...prevStudents.current]); // Khôi phục lại trạng thái trước khi chỉnh sửa
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
