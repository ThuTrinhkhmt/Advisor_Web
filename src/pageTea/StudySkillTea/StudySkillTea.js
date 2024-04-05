import './StudySkillTea.css'
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea'
import Footer from '../../components/ComponentTea/FooterTea/FooterTea'
import Nav from '../../components/ComponentTea/NavTea/NavTea'
import { Fragment } from 'react'
function StudySkillTea() {
    return (
        <Fragment>
            <Header />
            <Nav />
        <div id = "SSkillPage">
            <h1>Hướng dẫn học tập!</h1>
        </div>
        <Footer />
        </Fragment>
    )
}

export default StudySkillTea