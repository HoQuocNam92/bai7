import { useContext, useEffect, useState } from "react";
import styles from "./Style.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductContext } from "@context/ProductContext";
import { CartContext } from "@context/CartContext";
const TotalPage = 12;
const Product = function Products() {
  const { handleCart } = useContext(CartContext) as any;
  const { product } = useContext(ProductContext) as any;
  const [currentPage, setCurrentPage] = useState(0);
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
    pagination,
    handlePagination,
    active,
    PaginationBtn,
  } = styles;
  const handleWishListBtn = (id) => {
    const fectData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/addToWishlist/${id}`,
        );
        if (response.status === 200) {
          alert("Thêm vào yêu thích thành công!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fectData();
  };

  const handlePaginationNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePaginationPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const buttons = Math.ceil(product.length / TotalPage);
  const startIndex = currentPage * TotalPage;
  const endIndex = startIndex + TotalPage;

  const products = product.slice(startIndex, endIndex);

  return (
    <div className={Container}>
      <h2 className={Title}>What's Good ?</h2>
      <div className={ProductList}>
        {products.map((item) => (
          <div className={Product}>
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
            <p className={ProductPrice}>{item.price} </p>
            <button
              style={{ cursor: "pointer" }}
              className={AddToCart}
              onClick={() => {
                handleCart(item.id);
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>Add To Cart
            </button>
          </div>
        ))}
      </div>
      <div className={pagination}>
        <button
          className={handlePagination}
          disabled={currentPage === 0}
          onClick={handlePaginationPrev}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        {Array.from({ length: buttons }, (_, index) => (
          <button
            key={index}
            disabled={currentPage === index}
            onClick={() => setCurrentPage(index)}
            className={`${PaginationBtn}  ${currentPage === index ? active : ""}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === buttons - 1}
          onClick={handlePaginationNext}
          className={handlePagination}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Product;
