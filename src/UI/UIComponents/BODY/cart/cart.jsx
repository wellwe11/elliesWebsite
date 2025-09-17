import classes from "./cart.module.scss";
import { useContext, useEffect } from "react";

import cartContext from "../cartContext";
import bodyNoScroll from "@functions/bodyNoScroll";
import { useNavigate } from "react-router-dom";
import Products from "./products/products";

const ToPaymentMethod = () => {
  return <button>To payment method</button>;
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

  const { disableScroll, enableScroll } = bodyNoScroll();

  useEffect(() => {
    disableScroll();
  }, []);

  const handleNavigateBack = () => {
    navigate(-1);
    enableScroll();
  };

  const title = <h4 className={classes.title}>SHOPPING CART</h4>;

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

  return (
    <div className={classes.cart}>
      <div className={classes.background} onClick={handleNavigateBack} />
      <div className={classes.cartWrapper}>
        {title}
        {productsWrapper}
        {totalProductsWrapper}
        {toPaymentMethodWrapper}
      </div>
    </div>
  );
};

export default Cart;
