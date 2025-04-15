import { useState, memo, useContext } from "react";
import clsx from "clsx";
import { useAuth } from "@context/AuthContext";
import styles from "@components/style/Header.module.scss";
import { useNavigate, Link } from "react-router-dom";
import Cart from "@components/Cart/Cart";
import { CartContext } from "@context/CartContext";
const menu = [
  { name: "About Us", link: "#" },
  { name: "Our Locations", link: "#" },
  { name: "All Books", link: "#" },
  { name: "Book Exchange", link: "#" },
  { name: "Custom Order", link: "#" },
  { name: "My Account  ", link: "#" },
];

const Header = memo(() => {
  const { cart } = useContext(CartContext);
  const { userStatus, user, logout } = useAuth();
  const [OnCart, setOnCart] = useState(false);
  const handleOnCart = () => {
    setOnCart(!OnCart);
  };

  const Navigation = useNavigate();
  const handleHome = () => {
    Navigation("/");
  };

  const {
    Container,
    Navbar,
    Logo,
    Menu,
    Icons,
    Item,
    IconCart,
    Wish,
    User,
    ModalUser,
    Quantity,
  } = styles;
  return (
    <div className={clsx(Container)}>
      <div className={clsx(Navbar)}>
        <div onClick={handleHome} className={Logo}>
          <img src="/images/logo.webp" alt="" />
        </div>
        <div className={Menu}>
          <ul className={Item}>
            {menu.map((item, index) => (
              <li key={index}>
                <Link to={item.link} title={item.name}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={Icons}>
          <div className={IconCart} onClick={handleOnCart}>
            <i className="fa-solid fa-cart-shopping"></i>
            <p className={Quantity}> {cart.length}</p>
            <div style={{ display: OnCart ? "block" : "none" }}>
              <Cart />
            </div>
          </div>
          <div className={Wish}>
            <i className="fa-solid fa-heart"></i>
          </div>
          <div className={User}>
            {userStatus ? (
              <div>
                <span>
                  <i className="fa-solid fa-user"></i>
                  {user.name}
                </span>
                <div className={ModalUser}>
                  <p onClick={logout}>LOG OUT</p>
                  <p>
                    <Link to="user/profile">PROFILE</Link>
                  </p>
                </div>
              </div>
            ) : (
              <p>
                <Link to="/account">Account </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Header;
