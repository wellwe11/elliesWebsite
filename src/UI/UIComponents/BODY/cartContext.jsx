import { createContext } from "react";

const cartContext = createContext({
  cart: {},
  setCart: () => {},
});

export default cartContext;
