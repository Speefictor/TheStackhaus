"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback } from "react";

export type Item = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
};

type CartItem = {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

type State = {
  items: Item[];
  isCartOpen: boolean;
};

type Action =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART_OPEN"; payload: boolean };

const initialState: State = {
  items: [],
  isCartOpen: false,
};

const CartContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);


const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.name === action.payload.name
      );
      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
        return { ...state, items: newItems };
      } else {
        const newItem: Item = {
          id: `${action.payload.name}-${Date.now()}`,
          ...action.payload,
          quantity: 1,
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }
    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return { ...state, items: newItems };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "SET_CART_OPEN":
      return { ...state, isCartOpen: action.payload };
    default:
      return state;
  }
};


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const { state, dispatch } = context;

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, [dispatch]);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, [dispatch]);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, [dispatch]);

  const setCartOpen = useCallback((isOpen: boolean) => {
    dispatch({ type: "SET_CART_OPEN", payload: isOpen });
  }, [dispatch]);

  const totalItems = useMemo(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }, [state.items]);

  const totalPrice = useMemo(() => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [state.items]);


  return {
    items: state.items,
    totalItems,
    totalPrice,
    isCartOpen: state.isCartOpen,
    addItem,
    removeItem,
    clearCart,
    setCartOpen,
  };
};
