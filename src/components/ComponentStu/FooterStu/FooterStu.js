import { Fragment } from 'react'
import './FooterStu.css'

function FooterStu() {
    return (
        <Fragment>
        <div className = "footer">
            <div className = "footer-box">
                <div className = "footer-box1">
                    <p>Thông tin liên hệ:</p>
                    <p>Email: studyadvisorweb@example.com</p>
                    <p>Điện thoại: +84-123-456-789</p>
                </div>
                <div className = "footer-box2">
                    <p>Quý học sinh chưa có tài khoản (hoặc quên mật khẩu) nhà trường vui lòng liên hệ với chúng tôi: </p>
                    <p>Email: support@studyadvisorweb.com</p>
                    <p>Điện thoại: +84-987-654-321</p>
                </div>
                <div className = "footer-box3">
                    <div className = "content-box3">Theo dõi chúng tôi trên mạng xã hội:</div>
                    <div class="social-lists">
                        <a href=""><i class="ti-facebook"></i></a>
                        <a href=""><i class="ti-instagram"></i></a>
                        <a href=""><i class="ti-twitter"></i></a>
                        <a href=""><i class="ti-linkedin"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div className = "footer-bottom">© 2024 Student Advisor Web. Tất cả các quyền được bảo lưu.</div>
        </Fragment>
    )
}

export default FooterStu