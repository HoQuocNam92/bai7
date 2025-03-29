import { useContext, useEffect, useState } from "react";
import styles from "./Style.module.scss";
import { Link } from "react-router-dom";
import { ProductContext } from "@context/ProductContext";
import { CartContext } from "@context/CartContext";
import { toast, ToastContainer } from "react-toastify";
const Product = function product() {
  const { handleAddCart } = useContext(CartContext) as any;
  const { product, more, setPage, page } = useContext(ProductContext) as any;
  console.log("CHECK true", more);
  const handlecart = (id) => {
    handleAddCart(id, 1);
    toast.success("Thêm giỏ hàng thành công");
  };
  const {
    Container,
    Title,
    Product,
    ProductList,
    ProductImage,
    WishListBtn,
    ProductTitle,
    ProductAuthor,
    ProductPrice,
    AddToCart,
    LoadMore,
  } = styles;
  const handleWishListBtn = (id) => {};

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={Container}>
      <ToastContainer
        position="top-left"
        autoClose={100}
        closeOnClick={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 className={Title}>What's Good ?</h2>
      <div className={ProductList}>
        {product.map((item) => (
          <div key={item.id} className={Product}>
            <div className={ProductImage}>
              <img loading="lazy" src={item.image_url} alt="item" />
              <button
                className={WishListBtn}
                onClick={() => handleWishListBtn(item.id)}
              >
                <i className="fa-regular fa-heart"></i>
              </button>
            </div>
            <h2 className={ProductTitle}>
              <Link to={`/book/${item.id}`}>{item.title}</Link>
            </h2>
            <p className={ProductAuthor}>{item.author}</p>
            <p className={ProductPrice}>{item.formattedPrice}</p>
            <button
              style={{ cursor: "pointer" }}
              className={AddToCart}
              onClick={() => {
                handlecart(item.id);
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>Add To Cart
            </button>
          </div>
        ))}
      </div>
      {more && (
        <div onClick={handleLoadMore} className={LoadMore}>
          <button>LOAD MORE...</button>
        </div>
      )}
    </div>
  );
};

export default Product;
