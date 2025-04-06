import React, { useContext, useEffect, useState } from "react";
import styles from "./Style.module.scss";
import clsx from "clsx";
import { ProductContext } from "@context/ProductContext";
import { useParams } from "react-router-dom";
const ProductDetails = React.memo(() => {
  const { id } = useParams();
  const { productDetail, setId } = useContext(ProductContext) as any;
  const [quantity, setQuantity] = useState(1);

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

  const product = productDetail[0];
  const {
    Container,
    ImageProduct,
    Text,
    TextName,
    Author,
    Meta,
    Description,
    Price,
    AddToCart,
    Section,
    Btn,
  } = styles;
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className={Container}>
      <div className={Section}>
        <div className={ImageProduct}>
          <img loading="lazy" src={product.image_url} alt="" />
        </div>
        <div className={clsx(Text)}>
          <h2 className={clsx(TextName)}>{product.title}</h2>
          <p className={clsx(Author)}>{product.author}</p>
          <p className={clsx(Meta)}>{product.meta}</p>
          <p className={clsx(Description)}>{product.description}</p>
          <p className={clsx(Price)}>Giá : {product.price} VND</p>
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
  );
});

export default ProductDetails;
