import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "@utils/axiosInstance";

import { createContext } from "react";
import { ProductContext } from "./ProductContext";
interface CartContextType {
  handleAddCart: (id: number, quantity: number) => void;
  cart: Products[];
  total: number;
  handleDelete: (id: number) => void;
  getData: () => void;
}

interface Products {
  id: number;
  title: string;
  author: string;
  price: number;
  image_url: string;
  quantity: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
import { toast, ToastContainer } from "react-toastify";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("accessToken");

  const [cart, setCart] = useState<Products[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { product } = useContext(ProductContext);
  const handleAddCart = async (id: number, quantity: number) => {

    const data = product.find((item) => item.id === id);
    if (!data) {
      return;
    }
    const totalForProduct = Number(data.price) * quantity;

    const payload = {
      id: data.id,
      title: data.title,
      price: data.price,
      image_url: data.image_url,
      quantity: quantity,
      total: totalForProduct,
    };
    try {
      await axiosInstance.post("/cart", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getData();
    } catch (error) {
      throw new Error("Error" + error);
    }
  };
  const handleDelete = async (id: number) => {
    const data = product.find((item) => item.id === id);
    if (!data) {
      return;
    }
    try {
      await axiosInstance.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getData();
      toast.success("Xóa sản phẩm thành công ")
    } catch (error) {
      throw new Error("Error" + error);
    }
  };
  const getData = async () => {
    try {
      const response = await axiosInstance.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const formatted = response.data.map((item) => ({
          ...item,
          formatCast: new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.price),

          formattedTotal: new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.total),
        }));

        setCart(formatted);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    setTotal(total);
  }, [cart]);

  return (
    <CartContext.Provider value={{ handleAddCart, handleDelete, cart, total, getData }}>
      <ToastContainer autoClose={100} />

      {children}
    </CartContext.Provider>
  );
};
