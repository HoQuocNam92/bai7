import React from "react";
import styles from "./Style.module.scss";
function Place() {
  const { Container, Place, Content, Location } = styles;
  return (
    <div className={Container}>
      <div className={Place}>
        <p>You can find us at</p>
        <div className={Content}>
          <div className={Location}></div>
          <div className={Location}></div>
          <div className={Location}></div>
        </div>
        <span>
          <a href="">VIEW ALL LOCATIONS</a>
        </span>
      </div>
    </div>
  );
}

export default Place;
