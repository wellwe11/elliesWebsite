import { createContext } from "react";

const cartContext = createContext({
  cart: {},
  setCart: () => {},
  totalItems: () => 0,
  totalPrice: () => 0,
});

export default cartContext;
