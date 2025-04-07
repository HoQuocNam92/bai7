import React, { useContext, memo } from "react";
import styles from "./Style.module.scss";
import { CartContext } from "@context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, total } = useContext(CartContext) as any;
  const {
    Container,
    Cart,
    Content,
    Name,
    Total,
    Details,
    Subtotal,
    CheckOut,
    ViewCart,
  } = styles;
  return (
    <div className={Container}>
      <div className={Cart}>
        <h4>My Cart</h4>
        {cart.map((item) => (
          <div className={Content}>
            <img src={item.image_url} alt="" />
            <div>
              <p className={Name}>{item.title}</p>
              <p className={Total}>
                {item.quantity} x {item.price} VND
              </p>
            </div>
            <button>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}

        <div className={Details}>
          <p className={Subtotal}>Subtotal : {total}.000 VND</p>
          <button className={CheckOut}>
            <Link to="/Checkout">
              {" "}
              <i className="fa-solid fa-cart-shopping"></i> CheckOut
            </Link>
          </button>
          <p>
            <Link to="/viewcart" className={ViewCart}>
              <i className="fa-solid fa-eye"></i> View Cart
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default memo(Cart);
