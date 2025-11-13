import classes from "./cart.module.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import X_SVG from "@components/SVGS/X_SVG/X_SVG";
import bodyNoScroll from "@functions/bodyNoScroll.js";

import storeData from "../../routeContainer/zustandObject/storeData.jsx";
import Products from "./components/products/products.jsx";

const ToPaymentMethod = () => {
  return (
    <Link>
      <p className={classes.paymentMethodText}>To payment method</p>
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

const CloseButton = ({ handleClick }) => {
  return (
    <button className={classes.closeButton} onClick={handleClick}>
      <X_SVG />
    </button>
  );
};

const Cart = () => {
  const cartRef = useRef();
  const [isOpen, setIsOpen] = useState(() => true);
  const navigate = useNavigate();

  const { enableScroll, disableScroll } = bodyNoScroll();

  useEffect(() => {
    const element = cartRef.current;
    if (!element) return;

    if (isOpen) {
      element.classList.add(classes.isOpen);
      element.classList.remove(classes.isClosed);
      disableScroll();
    } else {
      element.classList.remove(classes.isOpen);
      element.classList.add(classes.isClosed);
    }
  }, [isOpen]);

  const handleNavigateBack = () => {
    setIsOpen((prev) => !prev);

    if (isOpen) {
      setTimeout(() => {
        enableScroll();
        navigate(-1);
      }, 300); // === cartClosed animation timer = css
    }
  };

  return (
    <div className={`${classes.cart}`}>
      <div
        className={`${classes.cartWrapper} ${
          isOpen ? classes.isOpen : classes.isClosed
        }`}
        ref={cartRef}
      >
        <div className={classes.leftSection}>
          <h4 className={classes.title}>SHOPPING CART</h4>

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
            <CloseButton handleClick={handleNavigateBack} />
          </div>
          <div className={classes.productsWrapper}>
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
