import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import { Link } from "react-router-dom";

const Banner = () => {
  const { container, title, title_sub, text_content, banner_image, link } =
    styles;

  return (
    <div className={container}>
      <img
        className={banner_image}
        loading="lazy"
        src="/images/banner.jpg"
        alt="banner"
      />
      <div className={text_content}>
        <h2 className={title}>Read more, often</h2>
        <h2 className={title_sub}>Paperbacks in Saigon</h2>
        <p className={link}>
          <Link to="#">visit store</Link>
          <Link to="#">custom order</Link>
          <Link to="#">submit a book review</Link>
        </p>
      </div>
    </div>
  );
};

export default Banner;
