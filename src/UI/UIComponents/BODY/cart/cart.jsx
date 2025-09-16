import classes from "./cart.module.scss";
import { useContext, useEffect } from "react";

import cartContext from "../cartContext";
import bodyNoScroll from "@functions/bodyNoScroll";
import { useNavigate } from "react-router-dom";
import addToCart from "@functions/addToCart";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart, totalItems, totalPrice } = useContext(cartContext);
  const { disableScroll, enableScroll } = bodyNoScroll();

  // if objects have same id, stack them inside the same array
  // sorts items before viewing cart

  // add + and - button to increase/decrease amount of objects per item

  console.log(cart, totalItems(), totalPrice());

  useEffect(() => {
    disableScroll();
  }, []);

  const handleNavigateBack = () => {
    navigate(-1);
    enableScroll();
  };

  return (
    <div className={classes.cart}>
      <div className={classes.background} onClick={handleNavigateBack} />
      <div className={classes.cartWrapper}>
        <h1>cart</h1>
        <h1>{cart?.length}</h1>
      </div>
    </div>
  );
};

export default Cart;
