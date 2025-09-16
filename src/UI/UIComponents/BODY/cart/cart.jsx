import classes from "./cart.module.scss";
import { useContext, useEffect } from "react";

import cartContext from "../cartContext";
import bodyNoScroll from "@functions/bodyNoScroll";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(cartContext);
  const { disableScroll, enableScroll } = bodyNoScroll();

  useEffect(() => {
    disableScroll();
  }, []);

  const handleNavigateBack = () => {
    navigate(-1);
    enableScroll();
  };

  return (
    <div className={classes.cart} onClick={handleNavigateBack}>
      <div className={classes.cartWrapper}>
        <h1>cart</h1>
        <h1>{cart?.length}</h1>
      </div>
    </div>
  );
};

export default Cart;
