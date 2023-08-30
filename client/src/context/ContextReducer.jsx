import React, { createContext, useContext, useEffect, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();
const storedUser = JSON.parse(localStorage.getItem("user")) || {};
const userId = storedUser.userid || "";
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedCart = [...state, action.payload];
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
      return updatedCart;
    case "REINITIALIZE":
      return action.payload;
    case "UPDATE":
      const updatedCart1 = [...state];
      updatedCart1[action.payload.index] = action.payload.updatedItem;
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart1));
      return updatedCart1;

    case "REMOVE":
      const newarr = [...state];
      newarr.splice(action.payload, 1);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newarr));
      return newarr;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userId = storedUser.userid || "";
  const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

  const [state, dispatch] = useReducer(reducer, storedCart);
  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem("user")) || {};
    const newUserId = newUser.userid || "";
    const newStoredCart =
      JSON.parse(localStorage.getItem(`cart_${newUserId}`)) || [];
    dispatch({ type: "REINITIALIZE", payload: newStoredCart });
  }, []);
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
