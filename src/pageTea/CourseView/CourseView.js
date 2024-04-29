import React, { Fragment, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import ReactQuill from 'react-quill';
import ReactHtmlParser from 'html-react-parser'; // Import html-react-parser
import 'react-quill/dist/quill.snow.css';
import './CourseView.css';
function CourseView() {
  let { courseID, group } = useParams();
  // Từ courseID và group (này là mã môn và nhóm lớp), cậu tìm ra cái class tài liệu hướng dẫn dì á
  // Khai báo state cho thông tin của môn học
  const [editing, setEditing] = useState(false);
  const [course, setCourse] = useState({
    title: 'Tiêu đề môn học',
    content: 'Nội dung môn học',
    links: []
  });
  const preCourse = useRef(null);
  const handleEdit = () => {
    preCourse.current = {...course};
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // Code lưu thông tin môn học ở đây (nếu cần)
  };

  const handleCancel = () => {
    setEditing(false);
    setCourse(preCourse.current);
    // Code xử lý khi hủy chỉnh sửa (nếu cần)
  };

  const handleLinkChange = (e, index) => {
    const { name, value } = e.target;
    const newLinks = [...course.links]; // Tạo bản sao mới của course.links
    newLinks[index] = { ...newLinks[index], [name]: value }; // Thay đổi giá trị của phần tử tương ứng
    setCourse(prevCourse => ({
      ...prevCourse,
      links: newLinks // Cập nhật lại trạng thái của course với bản sao mới đã thay đổi
    }));
  };

  const handleAddLink = () => {
    setCourse(prevCourse => ({
      ...prevCourse,
      links: [...prevCourse.links, { url: '', name: '' }]
    }));
  };

  const handleRemoveLink = () => {
    if(course.links.length > 0)
    {
      let newLinks = [...course.links];
      newLinks = newLinks.slice(0, -1);
      setCourse(prevCourse => ({
        ...prevCourse,
        links: newLinks
      }));
    }
  };

  return (
    <Fragment>
      <Header />
      <Nav key='Nav' />
      <div className="pageView">
        <div className="course-info">
          {editing ? (
            <input
              type="text"
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
            />
          ) : (
            <h1>{course.title}</h1>
          )}
          {editing ? (
            <ReactQuill
              value={course.content}
              onChange={(value) => setCourse({ ...course, content: value })}
              modules={CourseView.modules}
              formats={CourseView.formats}
            />
          ) : (
            <div>{ReactHtmlParser(course.content)}</div>
          )}
          <div className="links">
            <h3>Tài liệu : </h3>
            {course.links.map((link, index) => (
              <div key={index}>
                {editing ? (
                  <div>
                    <input
                      type="text"
                      name="url"
                      value={link.url}
                      onChange={(e) => handleLinkChange(e, index)}
                      placeholder="Nhập địa chỉ của link"
                    />
                    <input
                      type="text"
                      name="name"
                      value={link.name}
                      onChange={(e) => handleLinkChange(e, index)}
                      placeholder="Nhập tên của link"
                    />
                  </div>
                ) : (
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
                )}
              </div>
            ))}
            {editing && (
                       <button className="btn-delete-link" 
                       onClick= {handleRemoveLink}>Xóa link</button>)}
            {editing && (
              <button className="link-btn" onClick={handleAddLink}>Thêm link</button>
            )}
          </div>
        </div>
        <button className='btn' onClick={editing ? handleCancel : handleEdit}>
          {editing ? 'Hủy' : 'Chỉnh sửa'}
        </button>
        {editing && (
          <button className="save-btn" onClick={handleSave}>Lưu</button>
        )}
      </div>
      <Footer />
    </Fragment>
  );
}

CourseView.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

CourseView.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default CourseView;
