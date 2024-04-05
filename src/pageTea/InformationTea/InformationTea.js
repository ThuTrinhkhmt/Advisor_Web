import './InformationTea.css'
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea'
import Footer from '../../components/ComponentTea/FooterTea/FooterTea'
import Nav from '../../components/ComponentTea/NavTea/NavTea'
import { Fragment } from 'react'
function InformationTea() {
    return (
        <Fragment>
            <Header />
            <Nav />
        <div id = "InformationPage">
            <h1>Thông tin cá nhân!</h1>
        </div>
        <Footer />
        </Fragment>
    )
}

export default InformationTea