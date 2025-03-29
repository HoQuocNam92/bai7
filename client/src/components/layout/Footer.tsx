import React from "react";
import style from "../style/Footer.module.scss";
import clsx from "clsx";

const Footer = () => {
  const {
    Footer,
    Logo,
    FooterSection,
    Title,
    Section,
    NameShop,
    CopyRight,
    icons,
    Location,
    Nav,
    ShowMap,
    MapBtn,
    ListMap,
    Maps,
    Address,
  } = style;
  return (
    <div className={Footer}>
      <div className={FooterSection}>
        <div className={clsx(Section, Logo)}>
          <img src="/images/footer.webp" alt="" />
          <h2 className={CopyRight}>2023 All rights reserved </h2>
          <div className={icons}>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fas fa-envelope"></i>
          </div>
        </div>
        <div className={clsx(Section, Nav)}>
          <h2 className={clsx(Title)}>Navigation </h2>
          <h2 className="nav">
            <a href="/">Home</a>
          </h2>
          <h2 className="nav">
            <a href="/">About Us</a>
          </h2>
          <h2 className="nav">
            <a href="/">Shop</a>
          </h2>
          <h2 className="nav">
            <a href="/">Blog</a>
          </h2>
          <h2 className="nav">
            <a href="/">Custom Order</a>
          </h2>
          <h2 className="nav">
            <a href="/">Book Review</a>
          </h2>
        </div>
        <div className={clsx(Section, Location)}>
          <h2 className={clsx(Title)}>Browse Books </h2>
          <p className={NameShop}>Bluish Coffee & Beer</p>
          <div className={Maps}>
            <p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1743850211660!5m2!1svi!2s"
                width="400"
                height="250"
                loading="lazy"
              ></iframe>
            </p>
          </div>
        </div>
        <div className={clsx(Section, ShowMap)}>
          <p>Café Slow</p>
          <div className={ListMap}>
            <div className={MapBtn}>
              <h2>show map</h2>

              <div className={Address}>
                <p>27/63A Huynh Tinh Cua, Ward 8, District 3, HCMC</p>
                <p>Tue-Sun, 07:00 – 19:00</p>
              </div>
            </div>
            <div className={MapBtn}>
              <h2>show map</h2>
              <div className={Address}>
                <p>27/63A Huynh Tinh Cua, Ward 8, District 3, HCMC</p>
                <p>Tue-Sun, 07:00 – 19:00</p>
              </div>
            </div>
            <div className={MapBtn}>
              <h2>show map</h2>

              <div className={Address}>
                <p>27/63A Huynh Tinh Cua, Ward 8, District 3, HCMC</p>
                <p>Tue-Sun, 07:00 – 19:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
