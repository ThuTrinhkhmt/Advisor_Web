import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea';
import Footer from '../../components/ComponentTea/FooterTea/FooterTea';
import Nav from '../../components/ComponentTea/NavTea/NavTea';
import './CourseView.css';

function CourseView() {
  return (
    <Fragment>
        <Header />
        <Nav key = 'Nav'/>
        <div className="page">
          <h1>Tổng quan môn học</h1>
        </div>
        <Footer />
    </Fragment>
  );
}

export default CourseView;
