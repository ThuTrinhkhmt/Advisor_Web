import React, { Fragment, useEffect, useRef } from 'react';
import Swiper from 'swiper';
import '../../../node_modules/swiper/swiper-bundle.min.css';
import './HomeStu.css';
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'

const imagePath1 = process.env.PUBLIC_URL + '/img/i1.jpg';
const imagePath2 = process.env.PUBLIC_URL + '/img/i2.jpg';
const imagePath3 = process.env.PUBLIC_URL + '/img/i3.jpg';
const hcmutImg1 = process.env.PUBLIC_URL + '/img/hcmut1.jpg';
const hcmutImg2 = process.env.PUBLIC_URL + '/img/hcmut2.jpg';

function HomeStu() {
    const swiperRef = useRef(null);

    useEffect(() => {
        swiperRef.current = new Swiper('.swiper-container', {
            loop: true,
            spaceBetween: 30,
            speed: 1000,
        });

        const interval = setInterval(() => {
            if (swiperRef.current) {
                swiperRef.current.slideNext();
            }
        }, 4000); // Thời gian chuyển slide

        return () => {
            clearInterval(interval);
            if (swiperRef.current) {
                swiperRef.current.destroy();
            }
        };
    }, []);

    return (
        <Fragment>
            <Header />
            <Nav />
            <div id="HomePage">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><img src={imagePath1} alt="Image 1" /></div>
                    <div className="swiper-slide"><img src={imagePath2} alt="Image 2" /></div>
                    <div className="swiper-slide"><img src={imagePath3} alt="Image 3" /></div>
                </div>
            </div>
            <div className="content-section">
                <h2 className="section-heading">Student Advisor Web</h2>
                <p className="section-sub-heading">Nâng tầm tri thức</p>
                <p className="about-text">
                Chào mừng bạn đến với Student Advisor - nơi bạn có thể tìm thấy sự hỗ trợ và tư vấn cần thiết để 
                thành công trong hành trình học tập của mình. Với sứ mệnh giúp đỡ học sinh và sinh viên khám phá 
                tiềm năng của mình, chúng tôi cung cấp một loạt các dịch vụ và công cụ giáo dục đa dạng, từ tư vấn
                học tập cá nhân đến cung cấp thông tin chi tiết về các trường học và chương trình học. Hãy đồng 
                hành cùng chúng tôi để khám phá và đạt được thành công trong hành trình học tập của bạn!
                </p>
            </div>
            <h2 className="section-heading">Sơ đồ khoa</h2>
            {/* <img className = "hcmut" src = {hcmutImg1} alt = "hcmut"></img> */}
            <img className = "hcmut"src = {hcmutImg2} alt = "hcmut"></img>
        </div>
            <Footer />
            </Fragment>
    );
}

export default HomeStu;
