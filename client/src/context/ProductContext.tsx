import { createContext, useEffect, useState } from "react";
import axiosInstance from "@utils/axiosInstance";

import axios from "axios";
interface AuthContextType {
  productDetail: TypeProduct[];
  product: TypeProduct[];
  setId: (id: number) => void;
  more: boolean;
  setPage: (number) => void;
  page: number;
  isLoading: Boolean;
  pageSize: number;
}
interface TypeProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  author: string;
  image_url: string;
}
export const ProductContext = createContext<AuthContextType | undefined>(
  undefined,
);
export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [productDetail, setProductDetail] = useState<TypeProduct[]>([]);
  const [id, setId] = useState<number>(0);
  const [product, setProduct] = useState<any>([]);
  const [more, setMore] = useState<boolean>(null);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const pageSize = 12;
  useEffect(() => {
    if (id > 0 && product.length > 0) {
      const foundProduct = product.find((item) => item.id === id) || null;
      setProductDetail(foundProduct);
    }
  }, [id, product]);

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
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/products?pageSize=${pageSize}&page=${page}`,
      );
      if (response.status === 200) {
        const hasMore = response.data.hasMore;
        const formattedData = response.data.products.map((item) => ({
          ...item,
          formattedPrice: new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.price),
        }));
        setMore(hasMore);
        setProduct((prev) => [
          ...prev,
          ...formattedData.filter(
            (newItem) => !prev.some((item) => item.id === newItem.id),
          ),
        ]);
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (page === 0) {
      setProduct([]);
    }
    fetchData();
  }, [page]);

  return (
    <ProductContext.Provider
      value={{ product, productDetail, setId, more, page, setPage, isLoading, pageSize }}
    >
      {children}
    </ProductContext.Provider>
  );
};
