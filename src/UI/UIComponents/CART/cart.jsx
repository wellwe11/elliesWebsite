import classes from "./cart.module.scss";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import X_SVG from "@components/SVGS/X_SVG/X_SVG";
import bodyNoScroll from "@functions/bodyNoScroll.js";

import storeData from "../routeContainer/zustandObject/storeData.jsx";
import Products from "./components/products/products.jsx";
import CloseButton from "@components/closeButton/closeButton.jsx";

const ToPaymentMethod = () => {
  return (
    <Link className={classes.paymentLink} to={"/paymentMethod"}>
      <p className={classes.paymentMethodText}>PAYMENT METHOD</p>
    </Link>
  );
};

const TotalProducts = () => {
  const { getTotalItems, getTotalPrice } = storeData(),
    totalItemsVar = getTotalItems(),
    totalPriceVar = Math.round(+getTotalPrice() * 100) / 100, // 19.999999... === 19.99
    currency = "€"; // will change in future

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

const Cart = ({ displayShoppingCart, setDisplayShoppingCart }) => {
  const cartRef = useRef();

  const { disableScroll, enableScroll } = bodyNoScroll();

  useEffect(() => {
    const element = cartRef.current;
    if (!element) return;

    if (displayShoppingCart) {
      element.classList.add(classes.isOpen);
      element.classList.remove(classes.isClosed);
      disableScroll();
    } else {
      element.classList.remove(classes.isOpen);
      element.classList.add(classes.isClosed);
    }
  }, [displayShoppingCart]);

  const handleNavigateBack = () => {
    enableScroll();
    setDisplayShoppingCart(!displayShoppingCart);
  };

  return (
    <div
      className={`${classes.cart} ${
        !displayShoppingCart ? classes.cartClosed : ""
      }`}
    >
      <div
        className={`${classes.clickBack} ${
          !displayShoppingCart ? classes.closed : ""
        }`}
        onClick={handleNavigateBack}
      />
      <div
        className={`${classes.cartWrapper} ${
          displayShoppingCart ? classes.isOpen : classes.isClosed
        }`}
        ref={cartRef}
      >
        <div className={classes.leftSection}>
          <h3 className={classes.title}>SHOPPING CART</h3>

          <div className={classes.cartBottomSection}>
            <div className={classes.totalProductsWrapper}>
              <TotalProducts />
            </div>
            <div className={classes.toPaymentMethodWrapper}>
              <ToPaymentMethod />
            </div>
          </div>
        </div>

        <div className={classes.rightSection}>
          <div className={classes.closeButtonWrapper}>
            <CloseButton
              handleClick={handleNavigateBack}
              onClick={handleNavigateBack}
            />
          </div>
          <div className={classes.productsWrapper}>
            <Products setDisplayShoppingCart={setDisplayShoppingCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
