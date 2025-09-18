import classes from "./cart.module.scss";
import { useContext, useEffect, useRef, useState } from "react";

import cartContext from "../cartContext";
import bodyNoScroll from "@functions/bodyNoScroll";
import { useNavigate } from "react-router-dom";
import Products from "./products/products";
import QuickViewButton from "@fullyComponents/quickView/quickViewButton/quickViewButton";
import X_SVG from "@components/SVGS/X_SVG/X_SVG";

const ToPaymentMethod = () => {
  return (
    <QuickViewButton
      text={<p className={classes.paymentMethodText}>To payment method</p>}
    ></QuickViewButton>
  );
};

const TotalProducts = () => {
  const { totalItems, totalPrice } = useContext(cartContext);
  const totalPriceVar = Math.round(+totalPrice() * 100) / 100; // 19.999999... === 19.99
  const totalItemsVar = totalItems();

  const currency = "€"; // will change in future
  const subtotalWrapper = (
    <p className={classes.totalText}>
      SUBTOTAL: {totalPriceVar}
      {" " + currency}
    </p>
  );

  const totalItemsWrapper = (
    <p className={classes.totalText}>TOTAL ITEMS: {totalItemsVar}</p>
  );

  return (
    <div className={classes.totalProducts}>
      {subtotalWrapper}
      {totalItemsWrapper}
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const cartWrapperRef = useRef();
  const backgroundWhiteRef = useRef();
  const { disableScroll, enableScroll } = bodyNoScroll();

  useEffect(() => {
    disableScroll();

    if (cartWrapperRef.current) {
      setTimeout(() => {
        cartWrapperRef.current.classList.add(classes.slideFromRight);
      }, 50);
    }

    if (backgroundWhiteRef.current) {
      setTimeout(() => {
        backgroundWhiteRef.current.classList.add(classes.appearBackgroundWhite);
      }, 50);
    }
  }, []);

  //  user wants to return away from cart
  const handleNavigateBack = () => {
    cartWrapperRef.current.classList.remove(classes.slideFromRight); // side-bar goes back before navigating away

    setTimeout(() => {
      // once cartWrapperRef is gone, fade back into website
      backgroundWhiteRef.current.classList.remove(
        classes.appearBackgroundWhite
      );
    }, 200);

    setTimeout(() => {
      // once transition is completed, navigate url to previous page
      navigate(-1);
      enableScroll();
    }, 500); // transitiion for slideFromRight is 0.2s; needs to match
  };

  const title = <h4 className={classes.title}>SHOPPING CART</h4>;

  const closeButton = (
    <button className={classes.closeButton} onClick={handleNavigateBack}>
      <X_SVG />
    </button>
  );

  const productsWrapper = (
    <div className={classes.productsWrapper}>
      <Products />
    </div>
  );

  const totalProductsWrapper = (
    <div className={classes.totalProductsWrapper}>
      <TotalProducts />
    </div>
  );

  const toPaymentMethodWrapper = (
    <div className={classes.toPaymentMethodWrapper}>
      <ToPaymentMethod />
    </div>
  );

  // add close button
  return (
    <div className={classes.cart}>
      <div
        className={classes.background}
        ref={backgroundWhiteRef}
        onClick={handleNavigateBack}
      />
      <div className={classes.cartWrapper} ref={cartWrapperRef}>
        <div className={classes.titleAndCloseWrapper}>
          {title}
          {closeButton}
        </div>
        {productsWrapper}
        <div className={classes.cartBottomSection}>
          {totalProductsWrapper}
          {toPaymentMethodWrapper}
        </div>
      </div>
    </div>
  );
};

export default Cart;
