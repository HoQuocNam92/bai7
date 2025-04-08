import React from "react";
import styles from "./Style.module.scss";
import { CartContext } from "@context/CartContext";
function CartDetails() {
  console.log("Cart Details render ");

  const { cart, total } = React.useContext(CartContext) as any;
  const {
    Container,
    Title,
    Images,
    TableCart,
    Content,
    OrderDetails,
    Price,
    Transport,
    Method,
  } = styles;
  return (
    <div className={Container}>
      <div>
        <div className={Images}></div>
        <h2 className={Title}> Cart</h2>
        <hr />
        <div className={Content}>
          <div className={TableCart}>
            <table>
              <tr>
                <th>Thumbnail</th>
                <th>Product Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>

              {cart.map((item) => (
                <tr>
                  <td>
                    <img loading="lazy" src={item.image_url} alt="" />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price} </td>
                  <td>{item.quantity}</td>
                  <td>{item.total} </td>
                </tr>
              ))}
            </table>
          </div>
          <div className={OrderDetails}>
            <h2 className={Title}>Order Detail</h2>

            <div className={Price}>
              <p> Subtotal</p> <span>{total} </span>
            </div>

            <div className={Transport}>
              <p>Shipping </p>

              <div className={Method}>
                <p>
                  <input type="radio" name="shipper" id="cost" />
                  <label htmlFor="cost">Standard Shipping: 35,000 ₫</label>
                </p>
                <p>
                  <input type="radio" name="shipper" id="local" />
                  <label htmlFor="local">
                    Local pickup (available at Bluish after 12pm of next working
                    day) Shipping options will be updated during checkout.
                  </label>
                </p>
              </div>
            </div>

            <div className={Price}>
              <p>Total :</p> <span>{total} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDetails;
