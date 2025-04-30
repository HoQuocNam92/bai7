import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@context/ProductContext";
import style from "./Swiper.module.scss";
import { Link } from "react-router-dom";
import { CartContext } from "@context/CartContext";
import { toast, ToastContainer } from "react-toastify";

const getRandomItems = (list: string[], count: number) => {
  const Shuffed = [...list].sort(() => 0.5 - Math.random());
  return Shuffed.slice(0, count);
};
const ProductOther = () => {
  const { product } = useContext(ProductContext) as any;
  const { handleAddCart } = useContext(CartContext) as any;

  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!product) {
      return;
    }
    setItems(getRandomItems(product, 4));
  }, []);
  const handlecart = (id) => {
    handleAddCart(id, 1);
    toast.success("Thêm giỏ hàng thành công");
  };
  const { Container, Item, Author, Price } = style;

  return (
    <div>
      <div className={Container}>
        {items.map((item) => (
          <div className={Item}>
            <img src={item.image_url} alt="" />
            <h2>  <Link to={`/book/${item.id}`}>{item.title}</Link></h2>
            <p className={Author}>{item.author}</p>
            <p className={Price}>{item.formattedPrice}</p>
            <button onClick={() => handlecart(item.id)}>Add To Cart</button>
          </div>
        ))}
      </div>
    </div>

  );
};

export default ProductOther;
