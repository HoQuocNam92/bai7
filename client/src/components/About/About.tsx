import styles from "./Style.module.scss";
import { Link } from "react-router-dom";
function About() {
  const {
    Container,
    Images,
    Content,
    Text,
    Title,
    Welcome,
    Description,
    BtnTell,
  } = styles;
  return (
    <div className={Container}>
      <div className={Images}></div>
      <div className={Content}>
        <h2 className={Title}>About Us</h2>
        <div className={Text}>
          <hr />
          <h3 className={Welcome}>
            Hello and welcome to Paperbacks in Saigon!
          </h3>
          <p className={Description}>
            We are an online English bookshop based in Ho Chi Minh City Vietnam.
          </p>
          <p className={Description}>
            We stock books across different genres, from fiction, non-fiction,
            to a variety of graphic novels, as well as beautiful coffee-table
            books.{" "}
          </p>
        </div>
        <p className={BtnTell}>
          <Link to="Tell me more"> TELL ME MORE</Link>
        </p>
      </div>
    </div>
  );
}

export default About;
