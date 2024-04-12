import React, { Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './ClassGrade.css';

function ClassGrade() {
    let { courseID, group } = useParams();

    const students = [
      {
        name: "John Doe",
        studentID: "1235456",
        componentScore: "KT:8 BTL:7 TN:8.5",
        examScore: 7.5,
        totalScore: 9.0
      },
      {
        name: "Render Smith",
        studentID: "7890612",
        componentScore: "KT:7.5 BTL:6 TN:7.8",
        examScore: 8.0,
        totalScore: 8.5
      },
      {
        name: "Mike Johnson",
        studentID : "4345678",
        componentScore: "KT:9.5 BTL:6.5 TN:9",
        examScore: 6.5,
        totalScore: 7.3
      },
      {
        name: "Alibaba Grande",
        studentID: "9961342",
        componentScore: "KT:6 BTL:7 TN:9",
        examScore: 10,
        totalScore: 9.4
      },
      {
        name: "Peter Scale",
        studentID: "2213412",
        componentScore: "KT:8.5 BTL:4 TN:8.8",
        examScore: 9.0,
        totalScore: 8.5
      },
      {
        name: "Bob Jashon",
        studentID : "2213413",
        componentScore: "KT:9.5 BTL:10 TN:9",
        examScore: 9,
        totalScore: 9.4
      },
      {
        name: "John Doe",
        studentID: "1235456",
        componentScore: "KT:8 BTL:7 TN:8.5",
        examScore: 7.5,
        totalScore: 9.0
      },
      {
        name: "Render Smith",
        studentID: "7890612",
        componentScore: "KT:7.5 BTL:6 TN:7.8",
        examScore: 8.0,
        totalScore: 8.5
      },
      {
        name: "Mike Johnson",
        studentID : "4345678",
        componentScore: "KT:9.5 BTL:6.5 TN:9",
        examScore: 6.5,
        totalScore: 7.3
      },
      {
        name: "Alibaba Grande",
        studentID: "9961342",
        componentScore: "KT:6 BTL:7 TN:9",
        examScore: 10,
        totalScore: 9.4
      },
      {
        name: "Peter Scale",
        studentID: "2213412",
        componentScore: "KT:8.5 BTL:4 TN:8.8",
        examScore: 9.0,
        totalScore: 8.5
      },
      {
        name: "Bob Jashon",
        studentID : "2213413",
        componentScore: "KT:9.5 BTL:10 TN:9",
        examScore: 9,
        totalScore: 9.4
      },
      {
        name: "John Doe",
        studentID: "1235456",
        componentScore: "KT:8 BTL:7 TN:8.5",
        examScore: 7.5,
        totalScore: 9.0
      },
      {
        name: "Render Smith",
        studentID: "7890612",
        componentScore: "KT:7.5 BTL:6 TN:7.8",
        examScore: 8.0,
        totalScore: 8.5
      },
      {
        name: "Mike Johnson",
        studentID : "4345678",
        componentScore: "KT:9.5 BTL:6.5 TN:9",
        examScore: 6.5,
        totalScore: 7.3
      },
      {
        name: "Alibaba Grande",
        studentID: "9961342",
        componentScore: "KT:6 BTL:7 TN:9",
        examScore: 10,
        totalScore: 9.4
      },
      {
        name: "Peter Scale",
        studentID: "2213412",
        componentScore: "KT:8.5 BTL:4 TN:8.8",
        examScore: 9.0,
        totalScore: 8.5
      },
    ];

    students.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Fragment>
            <Header />
            <Nav key='Nav' />
            <div className="page">
                <h1>Bảng điểm môn {courseID} lớp {group}</h1>
                <table>
                    <thead >
                        <tr>
                            <th className="color-draw centerTable">STT</th>
                            <th className="color-draw centerTable">Tên</th>
                            <th className="color-draw centerTable">MSSV</th>
                            <th className="color-draw centerTable">Điểm thành phần</th>
                            <th className="color-draw centerTable">Điểm thi</th>
                            <th className="color-draw centerTable">Điểm tổng kết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className="centerTable">{index + 1}</td>
                                <td>
                                    <Link to={`/course/${courseID}/${group}/${student.studentID}`}>{student.name}</Link>
                                </td>
                                <td className="centerTable">{student.studentID}</td>
                                <td>{student.componentScore}</td>
                                <td className="centerTable">{student.examScore}</td>
                                <td className="centerTable">{student.totalScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </Fragment>
    );
}

export default ClassGrade;
