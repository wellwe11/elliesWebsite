import classes from "./shoppingCart.module.scss";

import { useMemo } from "react";

import storeData from "../../../routeContainer/zustandObject/storeData.jsx";

import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";

const ShoppingCart = ({ setDisplayShoppingCart }) => {
  const { cart, getTotalItems } = storeData();

  const totalItemsInCart = useMemo(() => getTotalItems(), [cart]);

  return (
    <button
      className={classes.shoppingCart}
      onClick={() => setDisplayShoppingCart(true)}
      style={{
        marginLeft:
          totalItemsInCart > 99
            ? "-10px"
            : totalItemsInCart > 9
            ? "0px"
            : "5px",
      }}
    >
      <p className={classes.text}>Cart</p>
      <p className={classes.text}>
        {"[ "}
        <span
          className={classes.amount}
          style={{
            width:
              totalItemsInCart > 99
                ? "25px"
                : totalItemsInCart > 9
                ? "15px"
                : "10px",
          }}
        >
          {totalItemsInCart || 0}
        </span>
        {" ]"}
      </p>
    </button>
  );
};

export default ShoppingCart;
