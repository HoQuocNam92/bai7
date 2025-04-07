import React, { useContext, useEffect, useState, memo } from "react";
import { createContext } from "react";
import { ProductContext } from "./ProductContext";
interface CartContextType {
  handleCart: (id: number) => void;
  cart: any[];
  total: number;
  quantity: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);

  const [total, setTotal] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const { product } = useContext(ProductContext) as any;
  const handleCart = (id: number) => {
    const data = product.filter((item) => item.id === id);
    if (cart.length === 0) {
      return setCart((prev) => [
        ...prev,
        {
          id: data[0].id,
          title: data[0].title,
          price: data[0].price,
          image_url: data[0].image_url,
          quantity: 1,
        },
      ]);
    }
    const check = cart.find((item) => item.id === id);
    if (check) {
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
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
          quantity: 1,
        },
      ]);
    }
  };

  useEffect(() => {
    let totalPrice = cart.reduce(
      (total, item) => (total += item.price * item.quantity),
      0,
    );
    setTotal(totalPrice);
  }, [cart]);
  useEffect(() => {
    let totalQuantity = cart.reduce(
      (total, item) => (total += item.quantity),
      0,
    );
    setQuantity(totalQuantity);
  }, [cart]);
  return (
    <CartContext.Provider value={{ handleCart, cart, total, quantity }}>
      {children}
    </CartContext.Provider>
  );
};
