import './Course.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment, useState } from 'react'
import {Link} from 'react-router-dom';

function Course() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
    setIsOpen(!isOpen);
    };
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "CListPage">
                <h1 className='header'>/Tên môn học: Đang saii/</h1>
                <div className='buttons'>
                    <button>Khóa học</button>
                    <button>Tiến trình học tập</button>
                </div> 
                <div className='CourseView'>
                    
                </div>               
            </div>
        <Footer />
        </Fragment>
    )
}

export default Course
