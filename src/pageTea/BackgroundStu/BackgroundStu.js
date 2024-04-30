import React, { Fragment, useEffect, useRef, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import './BackgroundStu.css';
import { data } from '../../loginPage/Login_page';
function BackgroundStu() {
    let { studentID } = useParams();
    let { courseID } = useParams();
    let { group } = useParams();
    //Từ studentID, courseID và group, cậu phải tìm ra sinh viên đó và tiến trình học tập của nó
    //Ở trang này có nút chỉnh sửa nên cập nhật dữ liệu thường xuyên nè
    const groupdata = data.getAGroup(courseID, group);
    const studentData = groupdata.getAStudent(studentID);
    const StuFeedback = studentData.getAGroupFeedback(courseID).getFeedback();
    //Biến này của tớ
    const gradient = useMemo(() => {
        const ctx = document.createElement('canvas').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.2)');
        gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');
        return gradient;
    }, []);
    //Student này nè
    const student = useMemo(() => ({
        name: studentData.getName(),
        studentID: studentID,
        dateOfBirth: studentData.getDateOfBirth(),
        gender: studentData.getGender(),
        faculty: studentData.getFaculity(),
        address: studentData.getAddress()
    }), [studentData,studentID]);
    //Tiến trình đây nữa
    const [weeklyFeedback ,setWeeklyFeedback] = useState([]);
    useEffect(() => {
        const loadGroup = async () => {
            const weeklyFeedback = [];
            // Lặp qua các mục trong Map `StuFeedback`
            for (const [week, feedback] of StuFeedback.entries()) {
                weeklyFeedback.push({
                    week,
                    comment: feedback.getComment(),
                    rating: feedback.getRate(),
                });
            }
            setWeeklyFeedback(weeklyFeedback);
        };
        loadGroup();
    }, [StuFeedback]);
    const chartRef = useRef();
    const [editFeedback, setEditFeedback] = useState({});
    //Hai biến này củng là của tớ

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const labels = weeklyFeedback.map(item => `Tuần ${item.week}`);
        const data = weeklyFeedback.map(item => item.rating);

        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Điểm hàng tuần',
                    data: data,
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.5
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5.25,
                        margin: 10,
                        ticks: {
                            stepSize: 1,
                            precision: 0,
                            callback: function(value) {
                                if (value % 1 === 0 ) {
                                    return value;
                                }
                            }
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display : true,
                    text: "Tiến trình học tập",
                }
            }
        });

        chartRef.current.chart = chart;
    }, [gradient, weeklyFeedback]);

    const handleEditWeek = (week, comment, rating) => {
        setEditFeedback({ ...editFeedback, [week]: { ...editFeedback[week], comment: comment, rating: rating, editing: true } });
    };

    const handleSaveWeek = (week) => {
        const updatedFeedback = weeklyFeedback.map(item => {
        const currentEdit = editFeedback[item.week]; // Lấy giá trị từ `editFeedback`
        if (currentEdit) {
            // Nếu tuần hiện tại đang chỉnh sửa, cập nhật giá trị mới
            studentData.setStudentFeedback(courseID, item.week, currentEdit.comment, currentEdit.rating);
            return {
                ...item, // Giữ lại các giá trị hiện có
                comment: currentEdit.comment, // Cập nhật nhận xét mới
                rating: currentEdit.rating, // Cập nhật điểm mới
            };
        }
        return item;
        });
        setWeeklyFeedback(updatedFeedback);
        setEditFeedback({ ...editFeedback, [week]: false });
    };

    const handleCancelEdit = (week) => {
        setEditFeedback({ ...editFeedback, [week]: false });
    };

    const handleAddWeek = async () => {
        const newWeek = { week: weeklyFeedback.length + 1, comment: "", rating: 0 };
        await studentData.addStudentFeedback(courseID, weeklyFeedback.length + 1, "", 0);
        setWeeklyFeedback([...weeklyFeedback, newWeek]);
    };

    const handleDeleteWeek = async () => {
        if (weeklyFeedback.length > 0) {
            setWeeklyFeedback(weeklyFeedback.slice(0, -1));
        }
        await studentData.removeStudentFeedback(courseID, weeklyFeedback.length);
    };
    
    return (
        <Fragment>
            <Header />
            <Nav key='Nav' />
            <div className="pageBackground2">
                <h1>Thông Tin Sinh Viên</h1>
                <div className="img-contain">
                    <img src="../../../img/avt.jpg" alt="Avatar" />
                    <p>{student.name}</p>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Ngày sinh:</strong> {student.dateOfBirth}
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
                <div className="empty"></div>
                <h1>Tiến trình học tập</h1>
                <div className="Study-containt">
                    <ul>
                    {weeklyFeedback.map((item, index) => (
                        <li key={index}>
                            <div>
                                <p className = 'content-11'><strong>Tuần:</strong> {item.week}</p>
                                {editFeedback[item.week] ? ( // Kiểm tra trạng thái chỉnh sửa của ô tương ứng
                                    <div className = "btn-div">
                                        <p className = 'content-22'><strong>Nhận xét:</strong></p>
                                        <input
                                            className = "input-content"
                                            type="text"
                                            value={editFeedback[item.week].comment}
                                            onChange={(e) => setEditFeedback({ ...editFeedback, [item.week]: { ...editFeedback[item.week], comment: e.target.value } })}
                                        />
                                        <div className="parent-container">
                                        <p className = 'content-23'>
                                            <strong>Điểm:</strong>
                                            </p>
                                        <input
                                            className = "input-score"
                                            type="number"
                                            value={editFeedback[item.week].rating}
                                            onChange={(e) => setEditFeedback({ ...editFeedback, [item.week]: { ...editFeedback[item.week], rating: parseInt(e.target.value) } })}
                                        />
                                        </div>
                                        <button className="btn-edit1" onClick={() => handleSaveWeek(item.week)}>Lưu</button>
                                        <button className="btn-edit2" onClick={() => handleCancelEdit(item.week)}>Hủy</button>
                                    </div>
                                ) : (
                                    <div className = "btn-div">
                                        <div className='comment-container'>
                                            <p className = 'content-12'><strong>Nhận xét:</strong> {item.comment}</p>
                                        </div>
                                        <br />
                                        <p className = 'content-13'><strong >
                                            Điểm:</strong> {item.rating + '/5'}</p>
                                        <br />
                                        <div className="button-container">
                                            <button className="btn-editing" onClick={() => handleEditWeek(item.week, item.comment, item.rating)}>Chỉnh sửa</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                    </ul>
                    <div className="button-container2">
                        <button className="btn-add" onClick={handleAddWeek}>Thêm</button>
                        <button className="btn-delete" onClick={handleDeleteWeek}>Xóa</button>
                    </div>
                </div>
                <div className="empty"></div>
                <div className="chart">
                    <div className='chart-name'>sơ đồ tiến trình</div>
                    <canvas ref={chartRef} id="myChartCanvas"></canvas>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default BackgroundStu;
