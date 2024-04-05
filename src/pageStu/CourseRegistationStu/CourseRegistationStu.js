import './CourseRegistationStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
function CourseRegistationStu() {
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "InformationPage">
            <h1>Đăng kí khóa học!</h1>
            </div>
            <Footer />
        </Fragment>
    )
}

export default CourseRegistationStu