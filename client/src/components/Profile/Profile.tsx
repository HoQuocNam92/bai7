import React, { useContext, useEffect, useState } from "react";
import styles from "./Style.module.scss";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { UserContext } from '@context/UserContext';
 
export default function Profile() {
  const {updateProfile , user } = useContext(UserContext);
  const [userName , setUserName] = useState<string >(user.userName)
  const [email , setEmail] = useState<string>(user.email)
  const [phone , setPhone] = useState<string>(user.phone)
  const [gender , setGender] = useState<string >(user.gender)
  console.log({userName , email , phone,gender})
  const [dobs , setDob] = useState<string >("");
  const updateProfiles = ()=>{
    const dob = dayjs(dobs, "YYYY-MM-DD").format("DD/MM/YYYY");

    updateProfile({userName , email ,  phone , dob , gender})
   }
  useEffect(()=>{
    if(user.dob){
     const dobCL = dayjs(user.dob,"DD/MM/YYYY").format("YYYY-MM-DD");
  setDob(dobCL)
    }
  },[user.dob])
  
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
                  Tên 
                </label>
                <input type="text" onChange={(e)=>(setUserName(e.target.value))} value={userName} />
              </div>
              <div className={info}>
                <label className={Title} htmlFor="">
                  Email
                </label>
                <input type="text" onChange={(e)=>(setEmail(e.target.value))} value={email} />

              </div>
              <div className={info}>
                <label className={Title}  >
                  Số điện thoại
                </label>
                <input type="text" onChange={(e)=>(setPhone((e.target.value)))} value={phone} />
              </div>
              <div className={info}>
                <label className={Title} htmlFor="">
                  Giới tính
                </label>
                <div className={Gender}>
                  <input id="male" name="gender" onClick={()=>(setGender("male"))} checked={gender ==="male"} value="male" type="radio" />
                  <label htmlFor="male">Nam</label>
                  <input
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    type="radio"
                    onClick={()=>(setGender("female"))} 
                  />
                  <label htmlFor="female">Nữ</label>
                  <input id="other" name="gender" onClick={()=>(setGender("other"))} checked={gender === "other"} value="other" type="radio" />
                  <label htmlFor="other">Khác</label>
                </div>
              </div>
              <div className={info}>
                <label className={Title} htmlFor="">
                  Ngày sinh
                </label>
                <input type="date"  value={dobs}  onChange={(e) => setDob(e.target.value)} />
              </div>
              <div className={Btn}>
                <button onClick={updateProfiles}>Lưu</button>
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
