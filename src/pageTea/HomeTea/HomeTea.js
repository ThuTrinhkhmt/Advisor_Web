import React, { Fragment, useEffect, useRef } from 'react';
import Swiper from 'swiper';
import '../../../node_modules/swiper/swiper-bundle.min.css';
import './HomeTea.css';
import Nav from '../../components/ComponentTea/NavTea/NavTea'
import Header from '../../components/ComponentTea/HeaderTea/HeaderTea'
import Footer from '../../components/ComponentTea/FooterTea/FooterTea'

const imagePath1 = process.env.PUBLIC_URL + '/img/i1.jpg';
const imagePath2 = process.env.PUBLIC_URL + '/img/i2.jpg';
const imagePath3 = process.env.PUBLIC_URL + '/img/i3.jpg';
const hcmutImg1 = process.env.PUBLIC_URL + '/img/hcmut1.jpg';
const hcmutImg2 = process.env.PUBLIC_URL + '/img/hcmut2.jpg';

function HomeTea() {
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
            <Nav key = 'Nav'/>
        <div id="HomePage">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><img src={imagePath1} alt="Image 1" /></div>
                    <div className="swiper-slide"><img src={imagePath2} alt="Image 2" /></div>
                    <div className="swiper-slide"><img src={imagePath3} alt="Image 3" /></div>
                </div>
            </div>
            <div className="content-section">
                <h2 className="section-heading">Teacher Advisor Web</h2>
                <p className="section-sub-heading">Nâng tầm tri thức</p>
                <p className="about-text">
                Chào mừng bạn đến với Teacher Advisor - nơi bạn có thể tìm thấy sự hỗ trợ và tư vấn cần thiết 
                để trở thành một giáo viên hiệu quả và động viên học sinh của mình. Với sứ mệnh giúp đỡ giáo viên
                khám phá và phát triển tiềm năng giảng dạy của mình, chúng tôi cung cấp một loạt các công cụ và 
                tài nguyên giáo dục đa dạng, từ kế hoạch giảng dạy cá nhân đến chia sẻ các phương pháp giảng dạy
                hiệu quả. Hãy đồng hành cùng chúng tôi để chia sẻ và học hỏi từ cộng đồng giáo viên, từ đó nâng 
                cao chất lượng giảng dạy và tạo điều kiện thuận lợi nhất cho sự phát triển học thuật của học 
                sinh.
                </p>
            </div>
            <h2 className="section-heading">Sơ đồ khoa</h2>
            {/* <img className = "hcmut" src = {hcmutImg1} alt = "hcmut"></img> */}
            <img className = "hcmut"src = {hcmutImg2} alt = "hcmut"></img>
        </div>
            <Footer/>
        </Fragment>
    );
}

export default HomeTea;
