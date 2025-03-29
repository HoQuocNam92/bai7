import React, { useEffect, useState } from "react";
import styles from "./Style.module.scss";
import { CartContext } from "@context/CartContext";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { style } from "@mui/system";
import axios from "axios";

function CartDetails() {
  const { cart, total, handleDelete, handleAddCart } = React.useContext(
    CartContext,
  ) as any;
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

  // Cập nhật số lượng cho từng sản phẩm trong giỏ hàng
  const handleQuantityChange = (id: number, value: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  useEffect(() => {
    Object.keys(quantities).forEach((id) => {
      const quantity = quantities[parseInt(id)];
      handleAddCart(parseInt(id), quantity); // Cập nhật số lượng cho từng sản phẩm
    });
  }, [quantities]);
  const handleCheckout = async () => {
    window.location.href = "http://localhost:8080/order/create_payment_url";
  };
  const {
    Container,
    Title,
    Images,
    TableCart,
    Content,
    OrderDetails,
    TableLeft,
    Options,
    Subtotal,
    Voucher,
    Box,
    ReturnToShop,
    Return,
    CLoseBtn,
  } = styles;

  return (
    <div className={Container}>
      <div>
        <div className={Images}></div>
        <h2 className={Title}>Cart</h2>
        <hr />
        <div className={Content}>
          <div className={TableCart}>
            <table className={TableLeft}>
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Product Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        loading="lazy"
                        src={item.image_url}
                        alt={item.title}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.formatCast} </td>
                    <td>
                      <input
                        type="number"
                        value={quantities[item.id] || item.quantity} // Hiển thị số lượng hiện tại
                        onChange={(e) =>
                          handleQuantityChange(item.id, Number(e.target.value))
                        }
                      />
                    </td>
                    <td className={CLoseBtn}>
                      {item.formattedTotal}
                      <i
                        onClick={() => handleDelete(item.id)}
                        className="fa-solid fa-xmark"
                      ></i>
                    </td>
                  </tr>
                ))}
                <tr className={Voucher}>
                  <td colSpan={2}>
                    <input type="text" placeholder="Coupon Code" />
                  </td>
                  <td colSpan={3}>
                    <button>Apply Coupon</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={ReturnToShop}>
              <Link to="/">
                <span className={Return}>
                  <span>
                    <i className="fa-solid fa-arrow-left"></i>
                  </span>
                  <span>Return To Shop</span>
                </span>
              </Link>
            </div>
          </div>
          <div className={OrderDetails}>
            <h2 className={Title}>Order Detail</h2>
            <div>
              <div className={clsx(Box)}>
                <p>Subtotal</p>
                <p className={Subtotal}>
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <div className={clsx(Box, Options)}>
                <p>Shipping</p>
                <p>
                  <span>
                    <input type="checkbox" />
                    Standard Shipping: 35,000 ₫
                  </span>
                  <span>
                    <input type="checkbox" />
                    Local pickup (available at Bluish after 12pm of next working
                    day) Shipping options will be updated during checkout.
                  </span>
                </p>
              </div>
              <div className={Box}>
                <p>Total</p>
                <p>
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>

              <button onClick={handleCheckout}>Go To Secure Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDetails;
