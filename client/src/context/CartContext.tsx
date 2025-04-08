import React, { useContext, useEffect, useState, useCallback } from "react";
import { createContext } from "react";
import { ProductContext } from "./ProductContext";
interface CartContextType {
  handleCart: (id: number, quantity: number) => void;
  cart: any[];
  total: number;
  quantity: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
function formatMoneyVND(number) {
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);

  const [total, setTotal] = useState<number>(0);

  const [quantity, setQuantity] = useState<number>(0);
  const { product } = useContext(ProductContext) as any;
  const handleCart = (id: number, quantity: number) => {
    const data = product.filter((item) => item.id === id);
    if (!data) {
      console.error("Không tìm thấy sản phẩm với id:", id);
      return;
    }
    if (cart.length === 0) {
      return setCart((prev) => [
        ...prev,
        {
          id: data[0].id,
          title: data[0].title,
          price: data[0].price,
          image_url: data[0].image_url,
          quantity: quantity || 1,
          total: formatMoneyVND(data[0].price),
        },
      ]);
    }

    const check = cart.find((item) => item.id === id);
    if (check) {
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + quantity || 1,
              total: formatMoneyVND(item.price * (item.quantity + 1)),
            };
          }
          return item;
        }),
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          id: data[0].id,
          title: data[0].title,
          price: data[0].price,
          image_url: data[0].image_url,
          quantity: quantity || 1,
          total: formatMoneyVND(data[0].price),
        },
      ]);
    }
  };

  useEffect(() => {
    let totalPrice = cart.reduce(
      (total, item) => (total += item.price * item.quantity),
      0,
    );

    setTotal(formatMoneyVND(totalPrice));
  }, [cart]);

  const handleQuantity = useCallback(() => {
    let totalQuantity = cart.reduce(
      (total, item) => (total += item.quantity),
      0,
    );
    setQuantity(totalQuantity);
  }, [cart]);

  useEffect(() => {
    handleQuantity();
  }, [handleQuantity]);
  return (
    <CartContext.Provider value={{ handleCart, cart, total, quantity }}>
      {children}
    </CartContext.Provider>
  );
};
