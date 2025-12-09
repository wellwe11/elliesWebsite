import classes from "./shoppingCart.module.scss";

import { useMemo } from "react";

import storeData from "../../../routeContainer/zustandObject/storeData.jsx";

import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";

const ShoppingCart = ({ setDisplayShoppingCart }) => {
  const { cart, getTotalItems } = storeData();

  const totalItemsInCart = useMemo(() => getTotalItems(), [cart]);

  const totalItemsInCartWrapper = totalItemsInCart > 0 && (
    <div className={classes.totalItemsInCartWrapper}>
      <p className={classes.text}>{totalItemsInCart}</p>
    </div>
  );

  return (
    <button
      className={classes.shoppingCart}
      onClick={() => setDisplayShoppingCart(true)}
    >
      cart
      {totalItemsInCartWrapper}
    </button>
  );
};

export default ShoppingCart;
