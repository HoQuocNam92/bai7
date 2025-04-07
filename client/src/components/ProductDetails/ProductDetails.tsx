import React, { useContext, useEffect, useState } from "react";
import styles from "./Style.module.scss";
import clsx from "clsx";
import { ProductContext } from "@context/ProductContext";
import { useParams } from "react-router-dom";
import ProductOther from "@components/Swiper/Swiper";

const ProductDetails = React.memo(() => {
  const { id } = useParams();
  const { productDetail, setId } = useContext(ProductContext) as any;
  const [quantity, setQuantity] = useState(1);
  const { product } = useContext(ProductContext) as any;
  useEffect(() => {
    if (id) {
      setId(Number(id));
    }
  }, [id]);
  useEffect(() => {
    if (productDetail.length > 0) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [productDetail]);

  const products = productDetail[0];
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
  return (
    <div>
      <div className={Container}>
        <div className={Section}>
          <div className={ImageProduct}>
            <img loading="lazy" src={products.image_url} alt="" />
          </div>
          <div className={clsx(Text)}>
            <h2 className={clsx(TextName)}>{products.title}</h2>
            <p className={clsx(Author)}>{products.author}</p>
            <p className={clsx(Meta)}>{products.meta}</p>
            <p className={clsx(Description)}>{products.description}</p>
            <p className={clsx(Price)}>Giá : {products.price} VND</p>
            <div className={Btn}>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                name=""
                min={1}
                id=""
              />
              <button className={clsx(AddToCart)}>
                <i className="fa-solid fa-cart-shopping"></i>Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductOther />
    </div>
  );
});

export default ProductDetails;
