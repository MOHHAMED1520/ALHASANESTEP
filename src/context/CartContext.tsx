import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { courses, type Course } from "@/data/courses";

export interface CartItem {
  course: Course;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (courseId: string) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isInCart: (courseId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((courseId: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.course.id === courseId);
      if (existing) return prev;
      const course = courses.find((c) => c.id === courseId);
      if (!course) return prev;
      return [...prev, { course, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((courseId: string) => {
    setItems((prev) => prev.filter((item) => item.course.id !== courseId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.course.price * item.quantity, 0);

  const isInCart = useCallback(
    (courseId: string) => items.some((item) => item.course.id === courseId),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, totalItems, totalPrice, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
