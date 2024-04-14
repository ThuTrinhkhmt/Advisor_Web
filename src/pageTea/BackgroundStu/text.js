import React, { Fragment, useEffect, useRef, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

function text() {
    let { studentID } = useParams();
    let { courseID } = useParams();
    let { group } = useParams();
    const gradient = useMemo(() => {
        const ctx = document.createElement('canvas').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.2)');
        gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');
        return gradient;
    }, []);

    const student = useMemo(() => ({
        name: "Nguyễn Văn A",
        studentID: "SV001",
        dateOfBirth: "01/01/1990",
        gender: "Nam",
        faculty: "Khoa Học Máy Tính",
        address: "123 Đường ABC, Quận XYZ, Thành phố ABC"
    }), []);

    const weeklyFeedback = useMemo(() => ([
        { week: 1, comment: "Tuần đầu tiên, mọi thứ vẫn diễn ra suôn sẻ.", rating: 4 },
        { week: 2, comment: "Tuần này có một số khó khăn nhưng vẫn hoàn thành được nhiệm vụ.", rating: 5 },
        { week: 3, comment: "Cần cải thiện việc quản lý thời gian trong tuần này.", rating: 4 },
        { week: 4, comment: "Tuần này đã đạt được mục tiêu đề ra.", rating: 1 },
        { week: 5, comment: "Thành công trong việc giải quyết các vấn đề phát sinh.", rating: 4 },
        { week: 6, comment: "Cần tăng cường giao tiếp và hợp tác trong nhóm.", rating: 2 },
        { week: 7, comment: "Tuần này có nhiều áp lực nhưng vẫn giữ vững được sự kiên nhẫn.", rating: 5 },
        { week: 8, comment: "Cảm thấy mệt mỏi nhưng vẫn tiếp tục phấn đấu.", rating: 3 },
        { week: 9, comment: "Cần thêm sự tổ chức trong lịch làm việc của mình.", rating: 0 },
        { week: 10, comment: "Hoàn thành mọi nhiệm vụ một cách xuất sắc.", rating: 2 }
    ]), []);

    const chartRef = useRef();
    const [editFeedback, setEditFeedback] = useState({ week: null, comment: "", rating: 0 });

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
    }, []);

    const handleEditWeek = (week, comment, rating) => {
        setEditFeedback({ week, comment, rating });
    };

    const handleSaveWeek = () => {
        // Lưu dữ liệu chỉnh sửa
        console.log(editFeedback);
        setEditFeedback({ week: null, comment: "", rating: 0 });
    };

    const handleCancelEdit = () => {
        // Hủy bỏ chỉnh sửa
        setEditFeedback({ week: null, comment: "", rating: 0 });
    };
    
    return (
        <Fragment>
            <Header />
            <Nav key='Nav' />
            <div className="page">
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
                                <div><strong>Tuần :</strong> {item.week}</div>
                                {editFeedback.week === item.week ? (
                                    <div>
                                        <label>Nhận xét:</label>
                                        <input
                                            type="text"
                                            value={editFeedback.comment}
                                            onChange={(e) => setEditFeedback({ ...editFeedback, comment: e.target.value })}
                                        />
                                        <label>Điểm:</label>
                                        <input
                                            type="number"
                                            value={editFeedback.rating}
                                            onChange={(e) => setEditFeedback({ ...editFeedback, rating: parseInt(e.target.value) })}
                                        />
                                        <button onClick={() => handleSaveWeek()}>Lưu</button>
                                        <button className = "btn-edit2" onClick={() => handleCancelEdit()}>Hủy</button>
                                    </div>
                                ) : (
                                    <div>
                                        <strong>Nhận xét :</strong> {item.comment}
                                        <br />
                                        <strong>Điểm :</strong> {item.rating + '/5'}
                                        <br />
                                        <button className = "btn-edit" onClick={() => handleEditWeek(item.week, item.comment, item.rating)}>Chỉnh sửa</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
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

export default text;
