import classes from "./shoppingCart.module.scss";

import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";
import storeData from "../../../routeContainer/zustandObject/storeData.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { location } = useGetLocation();

  const { cart, getTotalItems } = storeData();

  const totalItemsInCart = useMemo(() => getTotalItems(), [cart]);

  const navigateCart = () => {
    if (location.pathname.includes("/cart")) return;

    const stateLocation = {
      backgroundLocation: location.pathname + location.search,
    };

    if (location.state) {
      stateLocation.prevBackgroundLocation =
        location.pathname + location.search;
      stateLocation.backgroundLocation = "/cart";
    }

    const { backgroundLocation, prevBackgroundLocation } = stateLocation;

    navigate("./cart", {
      state: {
        backgroundLocation,
        prevBackgroundLocation,
      },
    });
  };

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
    <div className={classes.shoppingCart} onClick={navigateCart}>
      {shoppingBagText}
      {shoppingBagSvgWrapper}
      {totalItemsInCartWrapper}
    </div>
  );
};

export default ShoppingCart;
