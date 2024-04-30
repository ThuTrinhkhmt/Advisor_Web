import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import ReactQuill from 'react-quill';
import ReactHtmlParser from 'html-react-parser'; // Import html-react-parser
import 'react-quill/dist/quill.snow.css';
import './CourseView.css';
import { data } from '../../loginPage/Login_page';
function CourseView() {
  let { courseID, group } = useParams();
  // Từ courseID và group (này là mã môn và nhóm lớp), cậu tìm ra cái class tài liệu hướng dẫn dì á
  const groupData=data.getAGroup(courseID, group);
  // Khai báo state cho thông tin của môn học
  const [editing, setEditing] = useState(false);
  const [course, setCourse] = useState({
    title: groupData.getTitle(),
    content: groupData.getDescription(),
    links: []
  });
  useEffect(() => {
    const loadDoc = async () => {
        const docArr = groupData.getDocuments(); // Lấy danh sách tài liệu
        if (Array.isArray(docArr)) {
            const links = docArr.map(doc => doc); // Lấy các liên kết
            // Làm rỗng mảng trước khi thêm dữ liệu mới
            setCourse(prevCourse => ({
                ...prevCourse,
                links: [...links], // Thêm liên kết mới
            }));
        }
    };
    loadDoc(); // Chạy hàm
  }, [groupData]);

  const checkChangedLinks = (originalLinks, newLinks) => {
    const changedLinks = [];
    // So sánh từng phần tử của mảng để tìm liên kết đã thay đổi
    newLinks.forEach((link, index) => {
        const oldLink = originalLinks[index];
        if (!oldLink || link.url !== oldLink.url || link.name !== oldLink.name) {
            changedLinks.push({ index, link }); // Thêm vào danh sách liên kết đã thay đổi
        }
    });

    return changedLinks; // Trả về danh sách các liên kết đã thay đổi
  };
  // Tìm liên kết mới được thêm vào
  const findAddedLinks = (originalLinks, newLinks) => {
    return newLinks.filter(
      (link) => !originalLinks.some((oldLink) => oldLink.url === link.url && oldLink.name === link.name)
    );
  };

  // Tìm liên kết bị mất hoặc xóa
  const findRemovedLinks = (originalLinks, newLinks) => {
  return originalLinks.filter(
    (link) => !newLinks.some((newLink) => newLink.url === link.url && newLink.name === link.name)
  );
  };

  const preCourse = useRef(course);
  const handleEdit = () => {
    preCourse.current = {...course};
    setEditing(true);
  };

  const handleSave = async () => {
    setEditing(false);
    const originalLinks = preCourse.current.links; // Các liên kết trước khi chỉnh sửa
    const newLinks = course.links;
    const changedLinks = checkChangedLinks(preCourse.current.links, course.links); // Kiểm tra liên kết đã thay đổi
    const originalTitle = preCourse.current.title;
    const newTitle = course.title; 
    const originalDescription = preCourse.current.content;
    const newDescription = course.content;
    if (originalTitle !== newTitle) {
      await groupData.changeTitle(newTitle); // Hàm cập nhật `title`
    }
    if (originalDescription !== newDescription) {
      await groupData.changeDescription(newDescription); // Hàm cập nhật `description`
    }
    if (changedLinks.length > 0 && originalLinks.length===newLinks.length) {
      for (const item of changedLinks) {
        await groupData.changeDocument(item.index, item.link);
      }
    }else if(originalLinks.length>newLinks.length){
      const removedLinks = findRemovedLinks(originalLinks, newLinks);
      const reversedRemovedLinks = removedLinks.reverse();
      for (const item of reversedRemovedLinks ) {
        await groupData.removeDocument(item);
      }
    }else{
      const addedLinks = findAddedLinks(originalLinks, newLinks);
      for (const item of addedLinks) {
        await groupData.addDocument(item);
      }
    }

    // Cập nhật lại trạng thái trước khi chỉnh sửa
    //preCourse.current = { ...course };
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
