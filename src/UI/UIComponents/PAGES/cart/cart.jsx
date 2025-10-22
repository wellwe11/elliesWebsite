import classes from "./cart.module.scss";
import routeClasses from "../../routeContainer/routeContainer.module.scss";

import Products from "./components/products/products.jsx";
import QuickViewButton from "@fullyComponents/quickView/quickViewButton/quickViewButton";
import X_SVG from "@components/SVGS/X_SVG/X_SVG";
import useAddDisplayClass from "./hooks/useAddDisplayClass.jsx";
import useNavigateBack from "./hooks/useNavigateBack.jsx";
import { storeData } from "../../routeContainer/routeContainer.jsx";

const ToPaymentMethod = () => {
  return (
    <QuickViewButton
      text={<p className={classes.paymentMethodText}>To payment method</p>}
    />
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

const Cart = () => {
  const title = <h4 className={classes.title}>SHOPPING CART</h4>;

  const { cartWrapperRef, backgroundWhiteRef } = useAddDisplayClass(classes);

  const { handleNavigateBack } = useNavigateBack(
    cartWrapperRef,
    backgroundWhiteRef,
    classes
  );

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
    <div className={`${classes.cart}`}>
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
