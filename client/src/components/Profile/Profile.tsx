import React from "react";
import styles from "./Style.module.scss";
import { useAuth } from "@context/AuthContext";
import { Link } from "react-router-dom";
export default function Profile() {
  const { user } = useAuth();
  const {
    Container,
    Header,
    SideBar,
    MainContent,
    Logo,
    Content,
    SubMenu,
    Menu,
    FormProfile,
    ImageProfile,
    InfoProfile,
    info,
    Gender,
    Btn,
    Title,
  } = styles;
  return (
    <div className={Container}>
      <div className={Content}>
        <div className={SideBar}>
          <div className={Logo}>
            <img src="/images/users.png" alt="user" />
            <h2>{user.name}</h2>
          </div>
          <ul className={Menu}>
            <li>
              <i className="fa-solid fa-bell"></i>Thông báo
            </li>
            <li>
              <i className="icons-user fa-solid fa-user"></i> Tài khoản của tôi
              <ul className={SubMenu}>
                <li>
                  <Link to="/profile">Hồ Sơ</Link>
                </li>
                <li>
                  <Link to="/profile">Ngân Hàng</Link>
                </li>
                <li>
                  <Link to="/profile">Địa Chỉ</Link>
                </li>
                <li>
                  <Link to="/profile">Đổi Mật Khẩu</Link>
                </li>
                <li>
                  <Link to="/profile">Cài Đặt Thông Báo</Link>
                </li>
                <li>
                  <Link to="/profile"> Những Thiết Lập Riêng Tư</Link>
                </li>
              </ul>
            </li>
            <li>
              <i className="fa-solid fa-store"></i>Đơn mua
            </li>
            <li>
              <i className="fa-solid fa-ticket"></i>Kho voucher
            </li>
            <li>
              <i className="fa-solid fa-coins"></i>Shoppe Xu
            </li>
          </ul>
        </div>
        <div className={MainContent}>
          <div className={Header}>
            <h2>Hồ Sơ Của Tôi</h2>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </div>
          <div className={FormProfile}>
            <div className={InfoProfile}>
              <div className={info}>
                <label className={Title} htmlFor="">
                  Tên đăng nhập
                </label>
                <span>{user.name}</span>
              </div>
              <div className={info}>
                <label className={Title} htmlFor="">
                  Tên{" "}
                </label>
                <input type="text" />
              </div>
              <div className={info}>
                <label className={Title} htmlFor="">
                  Email
                </label>
                <span>{user.email}</span>
              </div>
              <div className={info}>
                <label className={Title} htmlFor="">
                  Số điện thoại
                </label>
                <input type="text" />
              </div>
              <div className={info}>
                <label className={Title} htmlFor="">
                  Giới tính
                </label>
                <div className={Gender}>
                  <input id="male" name="gender " value="male" type="radio" />
                  <label htmlFor="male">Nam</label>
                  <input
                    id="female"
                    name="gender "
                    value="female"
                    type="radio"
                  />
                  <label htmlFor="female">Nữ</label>
                  <input id="other" name="gender" value="other" type="radio" />
                  <label htmlFor="other">Khác</label>
                </div>
              </div>
              <div className={info}>
                <label className={Title} htmlFor="">
                  Ngày sinh
                </label>
                <input type="number" />
              </div>
              <div className={Btn}>
                <button>Lưu</button>
              </div>
            </div>
            <div className={ImageProfile}>
              <img src="/images/users.png" alt="user" />
              <input type="file" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
