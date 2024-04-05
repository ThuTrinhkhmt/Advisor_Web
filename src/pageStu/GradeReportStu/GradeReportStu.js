import './GradeReportStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
function GradeReportStu() {
    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "SSkillPage">
            <h1>Bảng điểm</h1>
            </div>
            <Footer />
        </Fragment>
    )
}

export default GradeReportStu