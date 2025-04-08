import { useContext, useEffect, useMemo, useState, memo } from "react";
import clsx from "clsx";
import { useAuth } from "@context/AuthContext";
import { CartContext } from "@context/CartContext";
import styles from "@components/style/Header.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { ProductContext } from "@context/ProductContext";
import Cart from "@components/Cart/Cart";
const menu = [
  { name: "About Us", link: "#" },
  { name: "Our Locations", link: "#" },
  { name: "All Books", link: "#" },
  { name: "Book Exchange", link: "#" },
  { name: "Custom Order", link: "#" },
  { name: "My Account  ", link: "#" },
];

const Header = memo(() => {
  const [OnCart, setOnCart] = useState(false);
  const handleOnCart = () => {
    setOnCart(!OnCart);
  };

  const [results, setResults] = useState<any>([]);
  const Navigation = useNavigate();
  const handleHome = () => {
    Navigation("/");
  };

  const { Container, Navbar, Logo, Menu, Icons, Item, IconCart, Wish } = styles;
  return (
    <div className={clsx(Container)}>
      <div className={clsx(Navbar)}>
        <div onClick={handleHome} className={Logo}>
          <img src="/images/logo.webp" alt="" />
        </div>
        <div className={Menu}>
          <ul className={Item}>
            {menu.map((item) => (
              <li>
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
            <div style={{ display: OnCart ? "block" : "none" }}>
              <Cart />
            </div>
          </div>
          <div className={Wish}>
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Header;
