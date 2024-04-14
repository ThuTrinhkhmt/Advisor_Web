import React, { Fragment, useState } from 'react';
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
      //Từ courseID và group (này là mã môn và nhóm lớp), cậu tìm ra cái class tài liệu hướng dẫn dì á
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('Tiêu đề môn học');
  const [content, setContent] = useState('Nội dung môn học');
  const [links, setLinks] = useState([]);
  // Ba tham số cuối ở đây là của tài liệu hướng dẫn, tiêu đề nội dung và link, cái editing là của tớ riêng á

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleLinkChange = (e, index) => {
    const { name, value } = e.target;
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [name]: value };
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { url: '', name: '' }]);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1>{title}</h1>
          )}
          {editing ? (
            <ReactQuill
              value={content}
              onChange={(value) => setContent(value)}
              modules={CourseView.modules}
              formats={CourseView.formats}
            />
          ) : (
            <div>{ReactHtmlParser(content)}</div>
          )}
          <div className="links">
            <h3>Tài liệu : </h3>
            {links.map((link, index) => (
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
              <button className="link-btn" onClick={handleAddLink}>Thêm Link</button>
            )}
          </div>
        </div>
        <button className='btn' onClick={handleEdit}>
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
