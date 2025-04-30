import { useContext, useEffect, useState } from "react";
import styles from "./Style.module.scss";
import { Link } from "react-router-dom";
import { ProductContext } from "@context/ProductContext";
import { CartContext } from "@context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import clsx from 'clsx';
const Product = function product() {
  const { handleAddCart } = useContext(CartContext) as any;
  const { product, more, setPage, page, isLoading, pageSize } = useContext(ProductContext) as any;
  const handlecart = (id) => {
    handleAddCart(id, 1);
    toast.success("Thêm giỏ hàng thành công");
  };

  const {
    container,
    title,
    card_list,
    loading,
    card,
    card_image,
    card_title,
    card_author,
    wist_list_btn,
    card_price,
    add_cart_btn,
    load_more


  } = styles;
  const handleWishListBtn = (id) => { };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={container}>
      <ToastContainer
        position="top-left"
        autoClose={100}
        closeOnClick={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 className={title}>What's Good ?</h2>
      <div className={clsx(card_list,)}>
        {
          isLoading ? Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className={clsx(card, loading)}></div>
          ))
            :
            product.map((item) => (
              <div key={item.id} className={clsx(card)}>
                <div className={card_image}>
                  <img loading="lazy" src={item.image_url} alt="item" />
                  <button
                    className={wist_list_btn}
                    onClick={() => handleWishListBtn(item.id)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
                <h2 className={card_title}>
                  <Link to={`/book/${item.id}`}>{item.title}</Link>
                </h2>
                <p className={card_author}>{item.author}</p>
                <p className={card_price}>{item.formattedPrice}</p>
                <button
                  style={{ cursor: "pointer" }}
                  className={add_cart_btn}
                  onClick={() => {
                    handlecart(item.id);
                  }}
                >
                  <i className="fa-solid fa-cart-shopping"></i>Add To Cart
                </button>
              </div>
            ))
        }

      </div>
      {more && (
        <div onClick={handleLoadMore} className={load_more}>
          <button>LOAD MORE...</button>
        </div>
      )}
    </div>

  );
};

export default Product;
