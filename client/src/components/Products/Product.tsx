import React, { useEffect, useState } from "react";
import styles from "./Style.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
const TotalPage = 12;
const Product = function Products() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<any>([]);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/findProduct");
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handlePaginationNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePaginationPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const buttons = Math.ceil(data.length / TotalPage);
  const startIndex = currentPage * TotalPage;
  const endIndex = startIndex + TotalPage;
  //paginations

  // render products
  const products = data.slice(startIndex, endIndex);

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
            <p className={ProductPrice}>{item.price} ₫</p>
            <button className={AddToCart} id={item.id}>
              <Link to={`/book/${item.id}`}>
                {" "}
                <i className="fa-solid fa-cart-shopping"></i>Add To Cart
              </Link>
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
