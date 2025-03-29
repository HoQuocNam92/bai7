import React, { useContext, useEffect, useState, memo } from "react";
import styles from "./Style.module.scss";
import clsx from "clsx";
import { ProductContext } from "@context/ProductContext";
import { useParams } from "react-router-dom";
import ProductOther from "@components/Swiper/Swiper";
import { CartContext } from "@context/CartContext";
import { toast, ToastContainer } from "react-toastify";

const ProductDetails = () => {
  const { handleAddCart } = useContext(CartContext) as any;
  const { id } = useParams();

  const { productDetail, setId } = useContext(ProductContext) as any;

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (!id) {
      return;
    }
    console.log("CHECK DI", id);
    setId(Number(id));
  }, [id]);

  const products = productDetail;
  const {
    Container,
    ImageProduct,
    Text,
    TextName,
    Author,
    Meta,
    Description,
    Price,
    Section,
    Btn,
    AddToCart,
  } = styles;

  if (!products) {
    return <div>Loading...</div>;
  }
  const handleAddToCart = () => {
    toast.success("Thêm giỏ hàng thành công");
    handleAddCart(Number(id), quantity);
  };
  return (
    <div>
      <ToastContainer autoClose={100} />
      <div className={Container}>
        <div className={Section}>
          <div className={ImageProduct}>
            <img loading="lazy" src={products.image_url} alt="image" />
          </div>
          <div className={clsx(Text)}>
            <h2 className={clsx(TextName)}>{products.title}</h2>
            <p className={clsx(Author)}>{products.author}</p>
            <p className={clsx(Meta)}>{products.meta}</p>
            <p className={clsx(Description)}>{products.description}</p>
            <p className={clsx(Price)}>Giá : {products.formattedPrice} </p>
            <div className={Btn}>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                name=""
                min={1}
                id=""
              />
              <button className={clsx(AddToCart)} onClick={handleAddToCart}>
                <i className="fa-solid fa-cart-shopping"></i>Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductOther />
    </div>
  );
};

export default ProductDetails;
