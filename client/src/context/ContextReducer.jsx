import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedCart = [...state, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    case "UPDATE":
      const updatedCart1 = [...state];
      updatedCart1[action.payload.index] = action.payload.updatedItem;
      localStorage.setItem("cart", JSON.stringify(updatedCart1));
      return updatedCart1;

    case "REMOVE":
      const newarr = [...state];
      newarr.splice(action.payload, 1);
      localStorage.setItem("cart", JSON.stringify(newarr));
      return newarr;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [state, dispatch] = useReducer(reducer, storedCart);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
