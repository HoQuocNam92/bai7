import { createContext, useEffect, useState } from "react";
import axios from "axios";
interface AuthContextType {
  productDetail: TypeProduct[];
  product: TypeProduct[];
  setId: (id: number) => void;
}
interface TypeProduct {
  title: string;
  price: number;
  stock_quantity: number;
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
  useEffect(() => {
    const product = async (id: number) => {
      const response = await axios.get(
        `http://localhost:8080/findProduct/${id}`,
      );
      if (response.status === 200) {
        setProductDetail(response.data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    };
    if (id > 0) {
      product(id);
    }
  }, [id]);
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
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={{ product, productDetail, setId }}>
      {children}
    </ProductContext.Provider>
  );
};
