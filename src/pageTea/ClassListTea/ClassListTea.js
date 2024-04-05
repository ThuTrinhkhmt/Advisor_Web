import './ClassListTea.css'
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea'
import Footer from '../../components/ComponentTea/FooterTea/FooterTea'
import Nav from '../../components/ComponentTea/NavTea/NavTea'
import { Fragment } from 'react'
function ClassListTea() {
    return (
        <Fragment>
            <Header />
            <Nav />
        <div id = "CListPage">
            <h1>Danh sách lớp học!</h1>
        </div>
        <Footer />
        </Fragment>
    )
}

export default ClassListTea