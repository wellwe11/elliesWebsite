import classes from "./shoppingCart.module.scss";

import { useMemo } from "react";

import storeData from "../../../routeContainer/zustandObject/storeData.jsx";

import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";

const ShoppingCart = ({ setDisplayShoppingCart }) => {
  const { cart, getTotalItems } = storeData();

  const totalItemsInCart = useMemo(() => getTotalItems(), [cart]);

  // Simple text related to shoppingcart. Text is static and will remain the same.
  const shoppingBagText = (
    <div className={classes.shoppingBagText}>
      <p className={`${classes.cartText} ${classes.whiteText}`}>View cart</p>
      <p className={classes.cartText}>View cart</p>
      <p className={`${classes.cartText} ${classes.whiteText}`}>View cart</p>
    </div>
  );

  const totalItemsInCartWrapper = totalItemsInCart > 0 && (
    <div className={classes.totalItemsInCartWrapper}>
      <p className={classes.text}>{totalItemsInCart}</p>
    </div>
  );

  // svg-wrapper
  const shoppingBagSvgWrapper = (
    <div className={classes.shoppingBagWrapper}>
      <ShoppingBagSVG />
    </div>
  );

  return (
    <div
      className={classes.shoppingCart}
      onClick={() => setDisplayShoppingCart(true)}
    >
      {shoppingBagText}
      {shoppingBagSvgWrapper}
      {totalItemsInCartWrapper}
    </div>
  );
};

export default ShoppingCart;
