import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@context/ProductContext";
import style from "./Swiper.module.scss";

const getRandomItems = (list: string[], count: number) => {
  const Shuffed = [...list].sort(() => 0.5 - Math.random());
  return Shuffed.slice(0, count);
};
const ProductOther = () => {
  const { product } = useContext(ProductContext) as any;
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!product) {
      return;
    }
    setItems(getRandomItems(product, 4));
  }, []);

  const { Container, Item, Author, Price } = style;

  return (
    <div className={Container}>
      {items.map((item) => (
        <div className={Item}>
          <img src={item.image_url} alt="" />
          <h2>{item.title}</h2>
          <p className={Author}>{item.author}</p>
          <p className={Price}>{item.formattedPrice}</p>
          <button>Add To Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductOther;
