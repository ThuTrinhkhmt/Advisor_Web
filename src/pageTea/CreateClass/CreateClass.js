import './CreateClass.css'
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea'
import Footer from '../../components/ComponentTea/FooterTea/FooterTea'
import Nav from '../../components/ComponentTea/NavTea/NavTea'
import { Fragment } from 'react'
function CreateClass() {
    return (
        <Fragment>
            <Header />
            <Nav key = 'Nav'/>
            <div id = "page">
               <h1>Tạo lớp học</h1>
            </div>
            <Footer />
        </Fragment>
    )
}

export default CreateClass