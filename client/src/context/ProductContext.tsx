import { createContext, useEffect, useState } from "react";
import axios from "axios";
interface AuthContextType {
  data: TypeProduct[];
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
  const [data, setData] = useState<TypeProduct[]>([]);
  const [id, setId] = useState<number>(0);
  useEffect(() => {
    const product = async (id: number) => {
      const response = await axios.get(
        `http://localhost:8080/findProduct/${id}`,
      );
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    };
    if (id > 0) {
      product(id);
    }
  }, [id]);

  return (
    <ProductContext.Provider value={{ data, setId }}>
      {children}
    </ProductContext.Provider>
  );
};
