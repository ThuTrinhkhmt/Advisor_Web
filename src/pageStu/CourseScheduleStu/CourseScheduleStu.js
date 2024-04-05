import './CourseScheduleStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
function CourseScheduleStu() {
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "CListPage">
            <h1>Danh sách khóa học</h1>
            </div>
        <Footer />
        </Fragment>
    )
}

export default CourseScheduleStu