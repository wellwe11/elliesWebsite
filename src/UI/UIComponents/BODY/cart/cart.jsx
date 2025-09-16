import classes from "./cart.module.scss";
import { useContext } from "react";

import cartContext from "../cartContext";

const Cart = () => {
  const context = useContext(cartContext);

  console.log(context);
  return (
    <div>
      <h1>cart</h1>
    </div>
  );
};

export default Cart;
