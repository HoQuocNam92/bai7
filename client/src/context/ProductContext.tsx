import { createContext, useEffect, useState } from "react";
import axios from "axios";
interface AuthContextType {
  productDetail: TypeProduct[];
  product: TypeProduct[];
  setId: (id: number) => void;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        if (response.status === 200) {
          const formattedData = response.data.map((item) => ({
            ...item,
            formattedPrice: new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item.price),
          }));
          setProduct(formattedData);
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
