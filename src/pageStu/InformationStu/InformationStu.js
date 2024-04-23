import './InformationStu.css'
import Header from '../../components/ComponentStu/HeaderStu/HeaderStu'
import Footer from '../../components/ComponentStu/FooterStu/FooterStu'
import Nav from '../../components/ComponentStu/NavStu/NavStu'
import { Fragment } from 'react'
import React, { useEffect, useState } from 'react';
import {role, username} from '../../loginPage/Login_page'
import { PersonFactory } from '../../model/PersonFactory';
import { Account } from '../../model/Account';
function InformationStu() {
    const [account, setAccount] = useState(null);
    useEffect(() => {
        const loadAccount = async () => {
          const acc = new Account(role, username);
          await acc.loadFromDatabase();
          setAccount(acc);
        };
        loadAccount();
      }, []);

    return (
        <Fragment>
            <Header />
            <Nav />
            <div id = "InformationPage">
            <h1>Thông Tin Sinh Viên</h1>
                <div className = "img-contain">
                    <img src="../../../img/avt.jpg" alt="Avatar" />
                    <p>{}</p>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Ngày sinh:</strong> {}
                    </div>
                    <div className="col">
                    <strong>Giới tính:</strong> {}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>MSSV:</strong> {}
                    </div>
                    <div className="col">
                        <strong>Khoa:</strong> {}
                    </div>
                </div>
                <div className="row-2">
                    <div className="col">
                        <strong>Địa chỉ:</strong> {}
                    </div>
                </div>
            </div>
        <Footer />
        </Fragment>
    )
}

export default InformationStu