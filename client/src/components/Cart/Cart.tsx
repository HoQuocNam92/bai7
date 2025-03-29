import { useContext, memo } from "react";
import styles from "./Style.module.scss";
import { CartContext } from "@context/CartContext";
import { Link } from "react-router-dom";

const Cart = memo(() => {
  const { cart, total, handleDelete } = useContext(CartContext) as any;
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
    Text,
    CloseBtn,
    Notfound,
  } = styles;
  return (
    <div className={Container}>
      <div className={Cart}>
        <h4>My Cart</h4>
        {cart.length === 0 ? (
          <p className={Notfound}>No products in the Cart</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className={Content}>
                <img src={item.image_url} alt="image" />
                <div className={Text}>
                  <p className={Name}>{item.title}</p>
                  <p className={Total}>
                    {item.quantity} x {item.formatCast}
                  </p>
                </div>
                <div className={CloseBtn} onClick={() => handleDelete(item.id)}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
            ))}

            <div className={Details}>
              <p className={Subtotal}>
                Subtotal :{" "}
                {total.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <button className={CheckOut}>
                <Link to="/Checkout">
                  <i className="fa-solid fa-cart-shopping"></i> CheckOut
                </Link>
              </button>
              <p>
                <Link to="/cartdetails" className={ViewCart}>
                  <i className="fa-solid fa-eye"></i> View Cart
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
});
export default Cart;
